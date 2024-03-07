import mongoose from './index';

type Message = {
  message: string;
  author: string; // user _id of sender
  thread: string; // conversation _id which this message is about
  read: boolean;
  dateTime: Date;
};
// defining data structure
const Message = new mongoose.Schema<Message>({
  message: String,
  author: String, // user _id of sender
  thread: String, // conversation _id which this message is about
  read: { type: Boolean, default: false },
  dateTime: { type: Date, default: Date.now() },
});

const MessageModel = mongoose.model('messages', Message);
export default MessageModel;
