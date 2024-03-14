import express from "express";
import supertest from "supertest";
import { Model } from "mongoose";
// import Items from "./items";
import mongoose from "mongoose";
import router from "../router";

import ItemModel, { ItemType } from "../models/items";
const Items: Model<ItemType> = ItemModel;

const dbName = "test";

describe("Integration tests", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connection.close();
    const url = `mongodb://127.0.0.1/${dbName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await Items.deleteMany();
    await mongoose.connection.close();
  });

  it("should create new Item in the DB", async () => {
    const newItem = {
      title: "1",
      description: "4321",
      owner: "65ec8353ee17098b1be99dd4",
      date: "2024-03-13T16:35:36.305+00:00",
      location: {
        type: "point",
        coordinates: [13.390274047851562, 52.507445157449155],
      },
      locationName: "Friedrichstraße 46, 10969 Berlin, Germany",
      available: true,
      image: "",
    };
    console.log("my console.log: ", newItem.location.coordinates);
    const res = await request.post("/items").send(newItem);
    const item = await Items.findOne(newItem);
    if (item) {
      // expect(item.newItem).toBe(newItem);
      expect(item.title).toBe(newItem.title);
      expect(item.description).toBe(newItem.description);
    }
  });
});
