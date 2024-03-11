import mongoose from './index';
import { InferSchemaType } from 'mongoose';
//import User from './users';

export type ConversationType = InferSchemaType<typeof Conversation>;

// type Conversation = InferSchemaType<typeof >
// defining data structure
const Conversation = new mongoose.Schema({
  itemName: String, // item name which this conversation is about
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  }, // item _id which this conversation is about
  itemImage: String, // item image which this conversation is about
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //this is not true, should be the user_id of the contacting person
    required: true,
  }, // user _id of the contacting person
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // user _id of the item's owner
  date: { type: Date, default: Date.now() }, // date of conversation start
});

const ConversationModel = mongoose.model('conversations', Conversation);
export default ConversationModel;
