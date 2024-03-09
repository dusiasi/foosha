import { Conversation, Item, User } from "../types";

const rootUrl = `${
  import.meta.env.VITE_SERVER || "http://localhost:4000"
}/conversations`;


export async function postConversation(body: Conversation): Promise<Conversation> {
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
    throw new Error("error posting conversation");
  }
}

export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(rootUrl, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error getting conversation");
  }
}

export async function getConversationByItemId(
  id: string,
  contact: User
): Promise<Conversation> {
  try {

export async function getConversationByItemId (id:string, contact:Conversation):Promise<Conversation> {
  try   {
    const response = await fetch(`${rootUrl}/${id}/${contact}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error getting conversation");
  }
}
