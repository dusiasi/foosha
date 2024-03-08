import mongoose from "./index";
/////////////////////////////
export type Item = {
  title: string;
  description: string;
  owner: string;
  date: Date;
  location: {
    type: "Point";
    coordinates: number[];
  };
  locationName: string;
  available: boolean;
  image?: string;
};
//////////////////////////////
// defining data structure
const Item = new mongoose.Schema<Item>({
  title: String,
  description: String,
  owner: String,
  date: { type: Date, default: Date.now() },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  locationName: String,
  available: { type: Boolean, default: true },
  image: String,
});

Item.index({ location: "2dsphere" });
const ItemModel = mongoose.model("items", Item);
export default ItemModel;
