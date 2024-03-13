import ConversationModel from "../models/conversations";
import { Request, Response } from "express";
import ItemModel from "../models/items";


// getting all conversations from database
export const allConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await ConversationModel.find()
      .populate("messages")
      .exec();
    res.status(200);
    res.send(conversations);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while getting the conversations. Please try again later.",
    });
  }
};

export default { allConversations };
