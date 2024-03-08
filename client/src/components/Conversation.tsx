import { useEffect, useState } from "react";
import { postMessage } from "../services/messageService";
import { FaCommentDots, FaUser } from "react-icons/fa6";
import "./Conversation.css";
import Message from "./Message";
import { useMainContext } from "./Context";
import { formatDateTime } from "../services/utils";
import { getUserById } from "../services/userService";
import {
  User,
  Item,
  Conversation as ConversationType,
  Location,
  Message as MessageType,
} from "../types";

type FormValue = {
  message: string;
  author: string;
  thread: string;
  dateTime: number;
};

function Conversation({ item: conversation }: { item: ConversationType }) {
  const [showChat, setShowChat] = useState(false);
  const [messagesByConversation, setMessagesByConversation] = useState<
    MessageType[]
  >([]);

  const {
    user,
    messageList,
    setMessageList,
    setConversationList,
    conversationList,
  } = useMainContext();

  const initialState = {
    message: "",
    author: user._id,
    thread: conversation._id,
    dateTime: Date.now(),
  };

  const [formValues, setFormValues] = useState<FormValue>(initialState);

  // changes in the form
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  // send a new message
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      async function sendMessage(formValues: FormValue) {
        const newMessage = await postMessage(formValues);
        setMessageList((prevList) => [...prevList, newMessage]);
        setFormValues(initialState);
      }
      sendMessage(formValues);
    } catch (error) {
      console.error(error);
    }
  }

  // show the messages belonging to each conversation
  useEffect(() => {
    const filteredMessages = messageList.filter(
      (elem) => elem.thread === conversation._id
    );
    setMessagesByConversation(filteredMessages);
  }, [messageList]);

  // show the contact info on the conversation
  useEffect(() => {
    async function getOwnerAndContact(id: string) {
      const itemOwner = await getUserById(conversation.owner);
      const itemContact = await getUserById(conversation.contact);
      const updatedConversationList = conversationList.filter(
        (convo) => convo._id !== conversation._id
      );
      setConversationList([
        ...updatedConversationList,
        { ...conversation, contact: itemContact, owner: itemOwner },
      ]);

      // item.contactImage = itemContact.image || "";
      // item.ownerImage = itemOwner.image || "";
      // item.contactName = itemContact.name;
      // item.ownerName = itemOwner.name;
    }
    getOwnerAndContact(conversation._id);
  }, []);

  return (
    <>
      <div id="thread-with-chat">
        <div id="thread">
          <img src={conversation.itemImage} id="thread-image" />
          <div id="thread-info">
            <h3>{conversation.itemName}</h3>
            {messagesByConversation.map((elem, i) =>
              i === messagesByConversation.length - 1 ? (
                <div id="last-message-info" key={elem._id}>
                  <p>
                    {" "}
                    {messagesByConversation.length} message
                    {messagesByConversation.length > 1 ? "s" : ""}{" "}
                  </p>
                  <p>last message: {formatDateTime(elem.dateTime)}</p>
                  {elem.author != user._id ? (
                    <p id="your-turn-badge">{"your turn!"}</p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          {conversation.owner._id === user._id ? ( // changed to _id
            <div id="contact-info">
              <img id="contact-image" src={conversation.contact.image}></img>
              <p id="contact-name">{conversation.contact.name}</p>
            </div>
          ) : conversation.contact._id === user._id ? (
            <div id="owner-info">
              <img id="owner-image" src={conversation.owner.image}></img>
              <p id="owner-name">{conversation.owner.name}</p>
            </div>
          ) : null}
        </div>
        <div>
          <button
            id="chat-toggle-button"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? "hide chat " : "show chat "}
            <FaCommentDots></FaCommentDots>{" "}
          </button>
          {showChat ? (
            <div
              id="chat"
              style={{
                ...(conversation.itemImage && {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${conversation.itemImage})`,
                }),
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div id="chat-bubbles">
                {messagesByConversation.map((elem) => (
                  <Message key={elem._id} item={elem}></Message>
                ))}
              </div>
              <form id="chat-form" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="message"
                  value={formValues.message}
                  onChange={changeHandler}
                  placeholder="Be nice!"
                />
                <button className="save-button button-turqouise" type="submit">
                  Send
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Conversation;
