import ConversationModel from "../models/conversations";
import { Request, Response } from "express";
import ItemModel from "../models/items";

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

// getting all conversations from database
export const allConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await ConversationModel.find()
      .populate("messages")
      .exec();
    res.status(200);
    res.send(conversations);
    // return res.body;
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while getting the conversations. Please try again later.",
    });
  }
};

// getting converation for a certain item and contact
export const getConversationByItemId = async (req: Request, res: Response) => {
  console.log(":::::: GET CONVERSTAION BY ITEM ROUTE ");
  try {
    const id = req.params.id;
    const contact = req.params.contact;

    const conversation = await ConversationModel.findOne({
      itemId: id,
      contact: contact,
    })
      .populate("owner")
      .exec();
    if (conversation) {
      res.status(200);
      res.json(conversation);
    } else {
      res.status(400);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while getting the conversation. Please try again later.",
    });
  }
};

export default { postConversation, getConversationByItemId, allConversations };
