import { Dispatch, useState, SetStateAction } from "react";
import "./ContactForm.css";
import { useMainContext } from "./Context";
import { postMessage } from "../services/messageService";
import { Item, Message, Conversation as ConversationType } from "../types";

type propsType = {
  item: Item;
  setShowContactForm: Dispatch<SetStateAction<boolean>>;
};

function ContactForm({ item, setShowContactForm }: propsType) {
  const imageUrl = item.image ? item.image : "no image";
  const { user } = useMainContext();

  const [formValue, setFormValue] = useState("");

  // changes in the form
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const message = event.target.value;
    setFormValue(message);
  }

  // // submitting the form
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newMessage: Omit<Message, "_id"> = {
      message: formValue,
      owner: item.owner,
      author: user._id,
      itemId: item._id,
      read: false,
      dateTime: Date.now(),
    };

    try {
      async function createMessage() {
        await postMessage(newMessage);
        // setConversationList((prevList) => [...prevList, newConversation]);
        setFormValue("");
      }
      createMessage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form id="contact-form" onSubmit={submitHandler}>
      <input
        name="message"
        type="textarea"
        value={formValue}
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
