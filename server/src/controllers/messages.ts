import MessageModel from "../models/messages";
import { Request, Response } from "express";
import ConversationModel from "../models/conversations";

// posting new message to database
export const postMessage = async (req: Request, res: Response) => {
  try {
    let conversationId = req.body.conversation;
    const authorId = req.body.author;
    // Check if a conversation ID is provided
    if (!conversationId) {
      // Create a new conversation if one does not exist
      const newConversation = new ConversationModel({
        // Assuming you need at least the owner and/or sender to create a conversation,
        // You might need to adjust this according to your schema requirements
        owner: authorId, // This assumes the message sender is the conversation owner, adjust as needed
        messages: [], // Initialize with an empty array, will be updated below
      });
      const savedConversation = await newConversation.save();
      conversationId = savedConversation._id;
    }

    const messageData = { ...req.body, conversation: conversationId };
    const newMessage = new MessageModel(messageData);
    const savedMessage = await newMessage.save();

    // Update the conversation to include this new message's ID
    await ConversationModel.findByIdAndUpdate(
      conversationId,
      { $push: { messages: savedMessage._id } },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (error) {
    console.error(error); // Log the actual error
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

export default { postMessage, allMessages };
