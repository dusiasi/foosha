import { InferSchemaType, Document } from 'mongoose';
import mongoose from './index';

export type MessageType = InferSchemaType<typeof Message>;
type MessageDocument = Document<unknown, {}, MessageType> & MessageType;

const Message = new mongoose.Schema({
  itemId: String,
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conversations',
  },
  read: { type: Boolean, default: false },
  dateTime: { type: Date, default: Date.now() },
});

async function updateDate(doc: MessageDocument) {
  await mongoose
    .model('conversations')
    .updateOne({ _id: doc.conversation }, { dateTime: Date.now() });
}

Message.post('save', updateDate);

const MessageModel = mongoose.model('messages', Message);
export default MessageModel;
