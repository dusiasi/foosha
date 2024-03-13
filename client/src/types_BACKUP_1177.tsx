export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  image: string;
  preferences: string[];
};

// FOOD ITEM
export type Item = {
  _id: string;
  title: string;
  description: string;
  owner: string;
  date: Date;
  location: {
    coordinates: number[]; // [longitude, latitude]
  };
  locationName: string;
  available: boolean;
  image?: string; // Optional property
};

export type initialState = {
  message: string,
  author: string,
  thread: string,
  dateTime: Date,
}

export type Message = {
  message: string;
  author: string; // user _id of sender
  thread: string; // conversation _id which this message is about
  read: boolean;
  dateTime: number; // Date
};

export type Conversation = {
  _id: string;
  itemName: string; // item name which this conversation is about
  itemId: string; // item _id which this conversation is about
  itemImage: string; // item image which this conversation is about
  contact: User; // user _id of the contacting person
  owner: User;
  date: Date; // date of conversation start
};

export type Location = {
  lat: number;
  lng: number;
};
