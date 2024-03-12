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
  owner: User;
  date: Date;
  location: Location;
  conversations: Conversation[];
  locationName: string;
  available: boolean;
  image?: string; // Optional property
};


export type Message = {
  _id: string;
  message: string;
  author: User; // user _id of sender
  itemId: string;
  read: boolean;
  dateTime: number; // Date
};

export type Conversation = {
  _id: string;
  message: Message[];
  item: string; // item name which this conversation is about
  sender: User; // user _id of the contacting person
  owner: User;
  date: Date; // date of conversation start
};

export type Location = {
  lat: number;
  lng: number;
};
