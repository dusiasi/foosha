import { Message } from '../types';

const rootUrl = `${
  import.meta.env.VITE_SERVER || 'http://localhost:4000'
}/items/messages`;

export async function getAllMessages(): Promise<Message[]> {
  try {
    const response = await fetch(rootUrl, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error getting messages');
  }
}

export async function postMessage(body: Omit<Message, "_id">): Promise<Message> {
  try {
    const response = await fetch(rootUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error posting message");
  }
}
