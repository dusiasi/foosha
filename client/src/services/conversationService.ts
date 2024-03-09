import { Conversation, Item, User } from '../types';
const rootUrl = `${
  import.meta.env.VITE_SERVER || 'http://localhost:4000'
}/conversations`;
export async function postConversation(
  body: Omit<Conversation, '_id'>
): Promise<Conversation> {
  try {
    const response = await fetch(rootUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error posting conversation');
  }
}
export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(rootUrl, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error getting conversation');
  }
}
export async function getConversationByItemId(
  id: string,
  contact: string
): Promise<Conversation> {
  try {
    console.log('here');
    console.log(id, contact);
    const response = await fetch(`${rootUrl}/${id}/${contact}`, {
      method: 'GET',
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error('new error');
    }
  } catch (error) {
    console.log(error);
    throw new Error('error getting conversation');
  }
}
