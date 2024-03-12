import MessageModel from "../models/messages";
import { Request, Response } from "express";
import ItemModel from "../models/items";
import ConversationModel from "../models/conversations";

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { author, message, owner } = req.body;
    const { id } = req.params;

    // check if selected item has a conversation
    const item = await ItemModel.findOne({
      _id: id,
    })
      .populate("conversations")
      .exec();

    if (item?.conversations.length) {
      // res.status(201).json(message)
      const newMessage = new MessageModel({
        author: author,
        message: message,
        conversation: id,
      });
      await newMessage.save();
      res.status(201).send(newMessage);
    } else {
      const newConversation = new ConversationModel({
        sender: author,
        owner: owner,
        item: id,
        date: Date.now(),
      });
      await newConversation.save();

      const newMessage = new MessageModel({
        author: author,
        message: message,
        conversation: id,
      });
      await newMessage.save();
      res.status(201);
      res.send(newMessage);
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
