import { useState, useRef, useEffect } from 'react';
import './MyItem.css';
import './Item.css';
import {
  FaLocationDot,
  FaPencil,
  FaTrashCan,
  FaCircleCheck,
} from 'react-icons/fa6';
import { formatDate } from '../services/utils';
import { deleteItem } from '../services/itemService';
import { editItem } from '../services/itemService';
import { useMainContext } from './Context';
import { postImageToCloudinary } from '../services/itemService';
import { Item } from '../types';

export type FormValues = {
  title: string;
  description: string;
  image: string;
  available: boolean;
};

type Props = {
  item: Item;
};

function MyItem({ item }: Props) {
  const { setList } = useMainContext();
  const [showEdit, setShowEdit] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const itemRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (showEdit) {
      itemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [showEdit]);

  const initialState = {
    title: '',
    description: '',
    image: '',
    available: true,
  };

  const [formValues, setFormValues] = useState(initialState);

  // Handle changes for all inputs
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // we add conditional so that it only sets the imagefile if there is a file so that there is not null
      files && setImageFile(files[0]);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  }

  // edit form submit
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

    const newItemData = {
      ...formValues,
      image: imageUrl,
    };

    try {
      const updatedItem = await editItem(item._id, newItemData);
      setFormValues(newItemData);
      setList((list) =>
        list.map((elem) => {
          if (elem._id === item._id) return updatedItem;
          else return elem;
        })
      );
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  }

  // check button
  const markAsSaved = async () => {
    try {
      const body = item;
      const data = await editItem(item._id, { ...body, available: false });
      setList((list) =>
        list.map((elem) => {
          if (elem._id === item._id) return data;
          else return elem;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // delete button
  const handleDelete = async () => {
    try {
      async function deleteAndSet(id: string) {
        await deleteItem(id);
        setList((list) => list.filter((elem) => elem._id !== item._id));
      }
      deleteAndSet(item._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="item-edit-mode">
      <div id="item-container">
        <div id="item-info">
          <img id="item-image" src={item.image}></img>
          <p id="item-date">{formatDate(item.date)}</p>
          <p id="item-location">
            {' '}
            <FaLocationDot></FaLocationDot>
            {item.locationName}
          </p>
        </div>

        <div id="item-text">
          <h3>{item.title}</h3>
          <p id="item-description">{item.description}</p>
        </div>
        <img></img>
        {item.available ? (
          <div id="item-tools">
            <button onClick={() => setShowEdit(!showEdit)}>
              {' '}
              <FaPencil></FaPencil>{' '}
            </button>
            <button onClick={markAsSaved}>
              {' '}
              <FaCircleCheck></FaCircleCheck>{' '}
            </button>
            <button onClick={handleDelete}>
              {' '}
              <FaTrashCan></FaTrashCan>{' '}
            </button>
          </div>
        ) : (
          <p id="saved-stamp">saved</p>
        )}
      </div>
      {showEdit ? (
        <div ref={itemRef}>
          <form id="edit-form" onSubmit={submitHandler}>
            <label>title</label>
            <input
              name="title"
              type="text"
              value={formValues.title}
              onChange={changeHandler}
              placeholder="title"
              required={true}
            ></input>
            <label>description</label>
            <input
              name="description"
              type="text"
              value={formValues.description}
              onChange={changeHandler}
              placeholder="description"
              required={true}
            ></input>
            <label>image</label>
            <input
              id="upload-button-item-image"
              name="image"
              type="file"
              onChange={changeHandler}
            ></input>
            <button type="submit" className="button-turqouise save-edit-button">
              save changes
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default MyItem;