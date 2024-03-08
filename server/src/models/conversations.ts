import mongoose from './index';

type Conversation = {
  itemName: string;
  itemId: string;
  itemImage: string;
  contact: string;
  owner: mongoose.Schema.Types.ObjectId;
  date: Date;
};

// defining data structure
const Conversation = new mongoose.Schema<Conversation>({
  itemName: String, // item name which this conversation is about
  itemId: String, // item _id which this conversation is about
  itemImage: String, // item image which this conversation is about
  contact: String, // user _id of the contacting person
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // user _id of the item's owner
  date: { type: Date, default: Date.now() }, // date of conversation start
});

const ConversationModel = mongoose.model<Conversation>('conversations', Conversation);
export default ConversationModel;
