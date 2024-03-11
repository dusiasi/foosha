import { Dispatch, useState, SetStateAction } from 'react';
import './ContactForm.css';
import {
  getConversationByItemId,
  postConversation,
} from '../services/conversationService';
import { useMainContext } from './Context';
import { postMessage } from '../services/messageService';
import { Item, Message, Conversation as ConversationType } from '../types';
import { initialState as initialStateType } from '../types';
import Conversation from './Conversation';

type propsType = {
  item: Item;
  setShowContactForm: Dispatch<SetStateAction<boolean>>;
};

function ContactForm({ item, setShowContactForm }: propsType) {
  const imageUrl = item.image ? item.image : 'no image';
  const { user, setConversationList, setMessageList } = useMainContext();

  const initialState: Message = {
    _id: '',
    message: '',
    author: user._id,
    thread: '',
    read: false, // added
    dateTime: Date.now(),
  };

  const [formValues, setFormValues] = useState(initialState);

  // changes in the form
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  // submitting the form
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      async function createConversationAndMessage({ _id, author }: Message) {
        // Is there already a conversation for this item?
        const conversationInDb = await getConversationByItemId(
          item._id,
          author
        ); // was user._id

        console.log({ itemId: item._id, author });
        // if so:

        if (conversationInDb) {
          console.log('conversation exists');
          const newMessage = await postMessage({
            ...formValues,
            thread: conversationInDb._id,
          });
          // update message list
          setMessageList((prevList) => [...prevList, newMessage]);
        } else {
          // create a new conversation first
          const itemData: Omit<ConversationType, '_id'> = {
            itemId: item._id,
            itemName: item.title,
            itemImage: imageUrl,
            contact: user,
            owner: user,
            date: item.date,
          };

          const newConversation: ConversationType = await postConversation(
            itemData
          );
          console.log({ newConversation });
          // then post the message and add it to the new convo
          const newMessage = await postMessage({
            ...formValues,
            thread: newConversation._id,
          });

          // add the new convo to list of conversations and update message list
          setConversationList((prevList) => [...prevList, newConversation]);
          setMessageList((prevList) => [...prevList, newMessage]);
        }
        // in any case:
        setFormValues(initialState);
        setShowContactForm(false);
      }
      createConversationAndMessage(formValues);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form id="contact-form" onSubmit={submitHandler}>
      <input
        name="message"
        type="textarea"
        value={formValues.message}
        onChange={changeHandler}
        placeholder="message"
        required={true}
      ></input>

      <button className="save-button button-turqouise" type="submit">
        send
      </button>
    </form>
  );
}

export default ContactForm;
