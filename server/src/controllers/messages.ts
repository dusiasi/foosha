import MessageModel from '../models/messages';
import { Request, Response } from 'express';
import ItemModel from '../models/items';
import ConversationModel from '../models/conversations';

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { author, message, owner } = req.body;
    const { id } = req.params;

    // find item
    const item = await ItemModel.findOne({
      _id: id,
    })
      .populate('conversations')
      .exec();

    // check if selected item has a conversation
    if (item?.conversations.length) {
      const newMessage = new MessageModel({
        author: author,
        message: message,
        conversation: id,
      });
      await newMessage.save();

      await ConversationModel.updateOne(
        { sender: author },
        { $push: { messages: newMessage._id } }
      );

      res.status(201);
      res.send(newMessage);

      // if it doesn't add one
    } else {
      const newConversation = new ConversationModel({
        sender: author,
        owner: owner,
        item: id,
        date: Date.now(),
      });
      const newMessage = new MessageModel({
        author: author,
        message: message,
        conversation: id,
      });
      await newMessage.save();

      newConversation.messages.push(newMessage._id);
      await newConversation.save();
      res.status(201);
      res.send(newMessage);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while creating the conversation. Please try again later.',
    });
  }
};

// getting all messages from database
export const allMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessageModel.find().populate('author').exec();
    res.status(200);
    res.json(messages);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the messages. Please try again later.',
    });
  }
};

export default { postMessage, allMessages };
