import { InferSchemaType, Document } from 'mongoose';
import mongoose from './index';

export type MessageType = InferSchemaType<typeof Message>;
type MessageDocument = Document<unknown, {}, MessageType> & MessageType;
// defining data structure
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

// async function updateDate(doc: MessageDocument) {
//   await mongoose
//     .model('conversations')
//     .updateOne({ _id: doc.conversation }, { dateTime: Date.now() });
// }

// Message.post('save', updateDate);

async function updateConversation(doc: MessageDocument) {
  await mongoose
    .model('conversations')
    .updateOne({ _id: doc.conversation }, { $push: { conversations: doc } });
}

Message.post('save', updateConversation);

const MessageModel = mongoose.model('messages', Message);
export default MessageModel;

// Middleware to update the conversation model when a message is saved
// Message.post('save', async function (doc: MessageDocument) {
//   try {
//     const ConversationModel = mongoose.model('conversations');
//     const conversation = await ConversationModel.findById(doc.conversation);
//     if (conversation) {
//       conversation.messages.push(doc._id);
//       await conversation.save();
//     }
//   } catch (error) {
//     console.error('Error updating conversation:', error);
//   }
// });

// const MessageModel = mongoose.model('messages', Message);
// export default MessageModel;
