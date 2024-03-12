import MessageModel from "../models/messages";
import { Request, Response } from "express";
import ItemModel from "../models/items";
import ConversationModel from "../models/conversations";

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { author, message, owner } = req.body;
    const itemId = req.params.id; // This should be the item ID

    // Find the item and populate conversations to check if it exists
    const item = await ItemModel.findById(itemId)
      .populate("conversations")
      .exec();

    let conversationId;

    if (item && item.conversations && item.conversations.length > 0) {
      // Optionally, you might want to select a specific conversation based on some criteria
      conversationId = item.conversations[0]._id; // Assuming we use the first conversation for simplicity
    } else {
      // If no conversation exists, create a new one
      const newConversation = new ConversationModel({
        sender: author,
        owner: owner,
        item: itemId,
        date: Date.now(),
      });
      const savedConversation = await newConversation.save();
      conversationId = savedConversation._id;

      // Also, update the item to include this new conversation
      await ItemModel.findByIdAndUpdate(itemId, {
        $push: { conversations: conversationId },
      });
    }

    // Now that we have the correct conversationId, create the message
    const newMessage = new MessageModel({
      author: author,
      message: message,
      conversation: conversationId, // Use the resolved conversation ID
    });
    await newMessage.save();

    res.status(201).send(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "An unexpected error occurred while posting the message. Please try again later.",
    });
  }
};

// getting all messages from database
export const allMessages = async (req: Request, res: Response) => {
  console.log("messages requested ---------------");
  try {
    const messages = await MessageModel.find().populate("author").exec();
    res.status(200);
    res.json(messages);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while getting the messages. Please try again later.",
    });
  }
};

// posting new conversation to database
export const postConversation = async (req: Request, res: Response) => {
  try {
    // id
    const { id } = req.params;
    const conversation = req.body;
    // check if selected item has a conversation
    const item = await ItemModel.findOne({
      _id: id,
    })
      .populate("conversations")
      .exec();
    console.log(item);
    if (item?.conversations.length) {
      res.status(201).json(conversation);
    } else {
      const newConversation = new ConversationModel(conversation);
      newConversation.save();
      res.status(201);
      // console.log(newConversation);
      res.send(newConversation);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while creating the conversation. Please try again later.",
    });
  }
};

export default { postMessage, allMessages };
