import { Dispatch, useState, SetStateAction } from "react";
import './AddForm.css';
import { postImageToCloudinary, postItem } from "../services/itemService";
import { useMainContext } from "./Context";
import Map from "./Map";
import { formatLocation } from "../services/mapApiService";
import { Item, Location } from "../types";

type propsType = {
  setShowAddForm: Dispatch<SetStateAction<boolean>>
  newItemData: Item
}

function AddForm ({setShowAddForm}: propsType) {

  const { user, setList } = useMainContext();

  const initialState: Omit<Item, '_id'> = {
    title: '',
    description: '',
    owner: user, //was user._id
    location: {
      lat: 0,
      lng: 0,
    },
    image: '',
    locationName: '',
    available: true,
    date: Date.now()
  }

  const [formValues, setFormValues] = useState(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // changes in the form
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setImageFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  }

  // choosing a location by clicking on the map
  function handleLocationSelect (location: Location) {
    setFormValues((prev) => ({ ...prev, location }));
  };


// Submitting the form
async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  let imageUrl = '';
  if (imageFile) {
    try {
      imageUrl = await postImageToCloudinary({
        file: imageFile,
        upload_preset: 'nwjjpdw',
      });
    } catch (error) {
      console.error(error);
    }
  }

  const locationName = await formatLocation(formValues.location.lat, formValues.location.lng);
  const newItemData: Omit<Item, '_id'> = {
    ...formValues,
    image: imageUrl,
    locationName
  };

  try {
    const newItem = await postItem(newItemData);
    setList(prevList => [...prevList, newItem]);
    setFormValues(initialState);
    setShowAddForm(false);
    setImageFile(null);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <form id="add-form" onSubmit={submitHandler} >

      <h3>Add new item</h3>
      <input name="title" type="text" value={formValues.title} onChange={changeHandler} placeholder="title" required={true} ></input>
      <input name="description" type="textarea" value={formValues.description} onChange={changeHandler} placeholder="description" required={true} ></input>
      <Map mapAsInput={true} onLocationSelect={handleLocationSelect} zoom={13}></Map>
      <input id="upload-button" name="image" type="file" onChange={e => changeHandler} ></input>
      <button className="save-button button-turqouise" type="submit">save</button>
    </form>
  )
}

export default AddForm;