import MessageModel from '../models/messages';
import { Request, Response } from 'express';

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    const message = req.body;
    const newMessage = new MessageModel(message);
    newMessage.save();
    res.status(201);
    res.send(newMessage);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while posting the message. Please try again later.',
    });
  }
};

// getting all messages from database
export const allMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessageModel.find();
    res.status(200);
    res.send(messages);
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
