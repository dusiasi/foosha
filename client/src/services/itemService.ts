const rootUrl = `${
  import.meta.env.VITE_SERVER || 'http://localhost:3000'
}/items`;
const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;
//////////////////////////////////////////////////////////////////////////////
export type Item = {
  title: string;
  description: string;
  owner: string;
  date: Date;
  location: {
    type: 'Point';
    coordinates: number[]; // [longitude, latitude]
  };
  locationName: string;
  available: boolean;
  image?: string; // Optional property
};
//////////////////////////////////////////////////////////////////////////////
// post an item to list
export async function postItem(body: Item) {
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
export async function getAllItems() {
  try {
    const response = await fetch(rootUrl, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get only one item from db by id
export async function getItemById(id: string) {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// edit an item in db
export async function editItem(id: string, body: Item) {
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
