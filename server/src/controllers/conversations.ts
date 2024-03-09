import ConversationModel from '../models/conversations';
import { Request, Response } from 'express'

// posting new conversation to database
export const postConversation = async (req: Request, res: Response) => {
  try {
    const conversation = req.body;
    const newConversation = new ConversationModel(conversation);
    newConversation.save();
    res.status(201);
    res.send(newConversation);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while creating the conversation. Please try again later.',
    });
  }
};

// getting all conversations from database
export const allConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await ConversationModel.find().populate('owner') ;
    res.status(200);
    res.send(conversations);
    // return res.body;
  } catch (error) {
    console.error();
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the conversations. Please try again later.',
    });
  }
};

// getting converation for a certain item and contact
export const getConversationByItemId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = req.params.contact;
    const conversation = await ConversationModel.findOne({
      itemId: id,
      contact: contact,
    }).populate('owner').exec();
    res.status(200);
    res.send(conversation);
  } catch (error) {
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the conversation. Please try again later.',
    });
  }
};

export default { postConversation, getConversationByItemId, allConversations };