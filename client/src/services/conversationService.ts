import { Conversation, Item, User } from '../types';
const rootUrl = `${
  import.meta.env.VITE_SERVER || 'http://localhost:4000'
}/conversations`;

export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(rootUrl, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('error getting conversation');
  }
}

