import { Item } from '../types';
import { FormValues } from '../components/MyItem';
const rootUrl = `${
  import.meta.env.VITE_SERVER || 'http://localhost:4000'
}/items`;
const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;
//////////////////////////////////////////////////////////////////////////////

// post an item to list
export async function postItem(body: Omit<Item, '_id'>): Promise<Item> {
  try {
    const response = await fetch(rootUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error posting item');
  }
}

// post the image of an item or user to cloudinary
export async function postImageToCloudinary(body: {
  file: File;
  upload_preset: string;
}): Promise<string> {
  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error('error posting image');
  }
}

// get all items from database
export async function getAllItems(): Promise<Item[]> {
  try {
    const response = await fetch(rootUrl, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error getting all items');
  }
}

// get only one item from db by id
export async function getItemById(id: string): Promise<Item> {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error getting item');
  }
}

// edit an item in db
export async function editItem(
  id: string,
  body: FormValues
): Promise<FormValues> {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error editing item');
  }
}

// delete an item from db
export async function deleteItem(id: string) {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default {
  deleteItem,
  editItem,
  getItemById,
  getAllItems,
  postImageToCloudinary,
  postItem,
};
