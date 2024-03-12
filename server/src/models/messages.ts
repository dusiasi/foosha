import { InferSchemaType, Document } from 'mongoose';
import mongoose from './index';

export type MessageType = InferSchemaType<typeof Message>;
type MessageDocument = Document<unknown, {}, MessageType> & MessageType;
// defining data structure
const Message = new mongoose.Schema({
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  read: { type: Boolean, default: false },
  dateTime: { type: Date, default: Date.now() },
});

// async function updateDate(doc: MessageDocument) {
//   await mongoose
//     .model('conversations')
//     .updateOne({ _id: doc.conversation }, { dateTime: Date.now() });
// }

// Message.post('save', updateDate);

// async function updateConversation(doc: MessageDocument) {
//   await mongoose
//     .model('conversations')
//     .updateOne({ _id: doc.conversation }, { $push: { conversations: doc } });
// }

// Message.post('save', updateConversation);

const MessageModel = mongoose.model('messages', Message);
export default MessageModel;