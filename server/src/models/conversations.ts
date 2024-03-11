import mongoose from "./index";

import { InferSchemaType, Document } from "mongoose";
//import User from './users';

export type ConversationType = InferSchemaType<typeof Conversation>;
type ConversationDocument = Document<unknown, {}, ConversationType> &
  ConversationType;

const Conversation = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
      required: true,
    },
  ],
  date: { type: Date, default: Date.now() },
});

async function updateItem(doc: ConversationDocument) {
  await mongoose
    .model("items")
    .updateOne({ _id: doc.item?._id }, { $push: { conversations: doc } });
}

Conversation.post("save", updateItem);

const ConversationModel = mongoose.model("conversations", Conversation);
export default ConversationModel;
