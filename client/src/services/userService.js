const rootUrl = 'http://localhost:3000/user';

export async function createUser (body) {
  try {
    const response = await fetch(rootUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};

export async function login (body) {
  try   {
    const response = await fetch(`${rootUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};

export async function getUserById (id) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};

export async function updateUser (id, body) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  console.log('🚀', data);
  return data;
  } catch (error) {
    console.log(error);
}};