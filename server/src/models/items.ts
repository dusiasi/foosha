import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "./index";

export type ItemType = InferSchemaType<typeof Item>;

// defining data structure
const Item = new Schema({
  title: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: { type: Date, default: Date.now() },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      // required: true,
    },
  },
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
  ],
  locationName: String,
  available: { type: Boolean, default: true },
  image: String,
});

Item.index({ location: "2dsphere" });
const ItemModel = model("items", Item);

export default ItemModel;

//65ef050866b63835a2cc903d
