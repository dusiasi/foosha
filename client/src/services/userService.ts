import { FormValues } from '../routes/root';
import { User } from '../types';
import { FormValuesUserProfile } from '../routes/UserProfile';

const rootUrl = import.meta.env.VITE_SERVER || 'http://localhost:4000/user';

// create new user (signup)
export async function createUser(body: FormValues): Promise<User> {
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
    throw new Error('error creating User');
  }
}

// log in existing user
export async function login(body: Omit<FormValues, 'name'>): Promise<User> {
  try {
    const response = await fetch(`${rootUrl}/login`, {
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
    throw new Error('error logging in');
  }
}

// getting one user by id from db
export async function getUserById(id: string): Promise<User> {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('error getting user');
  }
}

// updating user in db
export async function updateUser(
  id: string,
  body: FormValuesUserProfile
): Promise<User> {
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
    throw new Error('error updating user');
  }
}
