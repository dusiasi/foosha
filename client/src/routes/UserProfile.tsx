import React, { useState } from 'react';
import { useMainContext } from '../components/Context';
import './UserProfile.css';
import { updateUser } from '../services/userService';
import { postImageToCloudinary } from '../services/itemService';

export type FormValuesUserProfile = {
  name: string;
  email: string;
  preferences: string[];
  image: string;
};

const initialFormState = {
  name: '',
  email: '',
  preferences: [],
  image: '',
};

function UserProfile() {
  const { user, setUser } = useMainContext();
  const [FormValuesUserProfile, setFormValuesUserProfile] =
    useState<FormValuesUserProfile>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle changes for all inputs

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormValuesUserProfile((prevValues) => {
        const newPreferences = checked
          ? [...prevValues.preferences, name] // add preference
          : prevValues.preferences.filter((preference) => preference !== name); // remove preference
        return { ...prevValues, preferences: newPreferences };
      });
    } else if (type === 'file') {
      files && setImageFile(files[0]);
    } else {
      setFormValuesUserProfile((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  }

  // Submit handler
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let imageUrl = '';
    if (imageFile) {
      try {
        imageUrl = await postImageToCloudinary({
          file: imageFile,
          upload_preset: 'nwvjjpdw',
        });
      } catch (error) {
        console.error(error);
      }
    }

    const newUserData = {
      ...FormValuesUserProfile,
      image: imageUrl,
    };

    try {
      const updatedUser = await updateUser(user._id, newUserData);
      setFormValuesUserProfile(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="user-header">
        <img id="user-image-profile" src={user.image}></img>
      </div>
      <div>
        <form id="user-form" onSubmit={submitHandler}>
          <label>username</label>
          <input
            type="text"
            name="name"
            value={FormValuesUserProfile.name}
            required={true}
            onChange={changeHandler}
          ></input>

          <label>email</label>
          <input
            type="email"
            name="email"
            value={FormValuesUserProfile.email}
            required={true}
            onChange={changeHandler}
          ></input>

          <label>profile image</label>
          <input
            id="upload-button-profile"
            name="image"
            type="file"
            onChange={changeHandler}
          ></input>

          <label>dietary preferences</label>
          <fieldset id="preferences-list">
            <div>
              <input
                type="checkbox"
                id="vegetarian"
                name="vegetarian"
                checked={FormValuesUserProfile.preferences.includes(
                  'vegetarian'
                )}
                onChange={changeHandler}
              />
              <label>vegetarian</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="vegan"
                name="vegan"
                checked={FormValuesUserProfile.preferences.includes('vegan')}
                onChange={changeHandler}
              />
              <label>vegan</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="pescetarian"
                name="pescetarian"
                checked={FormValuesUserProfile.preferences.includes(
                  'pescetarian'
                )}
                onChange={changeHandler}
              />
              <label>pescetarian</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="gluten-free"
                name="gluten-free"
                checked={FormValuesUserProfile.preferences.includes(
                  'gluten-free'
                )}
                onChange={changeHandler}
              />
              <label>gluten free</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="omnivore"
                name="omnivore"
                checked={FormValuesUserProfile.preferences.includes('omnivore')}
                onChange={changeHandler}
              />
              <label>omnivore</label>
            </div>
          </fieldset>
          <button className="save-button button-turqouise" type="submit">
            save
          </button>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
