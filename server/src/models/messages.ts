import { InferSchemaType, Document } from "mongoose";
import mongoose from "./index";

export type MessageType = InferSchemaType<typeof Message>;
type MessageDocument = Document<unknown, {}, MessageType> & MessageType;
// defining data structure
const Message = new mongoose.Schema({
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversations",
    required: true,
  },
  read: { type: Boolean, default: false },
  dateTime: { type: Date, default: Date.now() },
});

async function updateDate(doc: MessageDocument) {
  
  await mongoose
    .model("conversations")
    .updateOne({ _id: doc.conversation }, { dateTime: Date.now() });
}

Message.post("save", updateDate);

const MessageModel = mongoose.model("messages", Message);
export default MessageModel;
