import MessageModel from '../models/messages';
import { Request, Response } from 'express';
import ItemModel from '../models/items';
import ConversationModel from '../models/conversations';
import conversations from './conversations';
import mongoose, { ObjectId } from 'mongoose';

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { author, message, owner, itemId } = req.body;

    const item = await ItemModel.findOne({
      _id: itemId,
    }).populate({ path: 'conversations', model: 'conversations' });

    if (!item) return res.send('No item found').status(401);

    let convoWithUser;
    for (const convoId of item.conversations) {
      const conversation = await ConversationModel.findOne({ _id: convoId });
      if (
        conversation &&
        conversation.sender?.equals(new mongoose.Types.ObjectId(author))
      ) {
        console.log('TRUE!!');
        convoWithUser = conversation;
        break;
      }
    }

    if (!convoWithUser) {
      convoWithUser = new ConversationModel({
        sender: author,
        owner: owner,
        item: itemId,
        date: Date.now(),
      });
    }

    const newMessage = new MessageModel({
      author: author,
      message: message,
      conversation: itemId,
    });
    await newMessage.save();

    convoWithUser.messages.push(newMessage._id);
    convoWithUser.save();

    console.log(newMessage);
    res.status(201).send(newMessage);
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
  console.log('messages requested ---------------');
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
