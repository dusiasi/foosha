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

function Conversation() {

  const {
    user,
    messageList,
    list,
    setMessageList,
    setConversationList,
    conversationList,
  } = useMainContext();

  const [showChat, setShowChat] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [conversationArr, setConversationArr] = useState<ConversationType[]>([]);

  // changes in the form
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const message = e.target.value;
    setFormValues(message);
  }

  // send a new message
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newMessage: Omit<MessageType, "_id"> = {
      message: formValues,
      owner: item.owner,
      author: user,
      itemId: item._id,
      read: false,
      dateTime: Date.now(),
    };

    try {
      async function sendMessage() {
        const newMsg = await postMessage(newMessage);
        setFormValues("");
      }
      sendMessage();
    } catch (error) {
      console.error(error);
    }
  }


useEffect(() => {
  const mappedItems = list.flatMap((item) => item.conversations)
  const filteredConvos = mappedItems.filter(
    (convo) => convo.owner._id === user._id || convo.sender._id === user._id
  );
  setConversationArr(filteredConvos);
}, [list]);


  return (
    <>
      {conversationArr.map((convo) =>
      <div id="thread-with-chat">

        <div id="thread">
            <img src={convo.item.image} id="thread-image" />
            <div id="thread-info">
                <h3>{convo.item.title}</h3>
              {convo.messages.map((message, i) =>
                i === convo.messages.length - 1 ? (
                  <div id="last-message-info" key={i}>
                    <p>
                      {" "}
                      {convo.messages.length} message
                      {convo.messages.length > 1 ? "s" : ""}{" "}
                    </p>
                    <p>last message: {formatDateTime(new Date(message.dateTime))}</p>
                    {message.author._id != user._id ? (
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

            {convo.owner._id === user._id ? (
            <div id="contact-info">
                <img id="contact-image" src={convo.sender.image}></img>
              <p id="contact-name">{convo.sender.name}</p>
            </div>
          ) : convo.sender._id === user._id ? (
            <div id="owner-info">
              <img id="owner-image" src={convo.owner.image}></img>
              <p id="owner-name">{convo.owner.name}</p>
            </div>
            ) : null}

          </div>

      <div className="messages-wrapper">
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
                ...(convo.item.image && {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${convo.item.image})`,
                }),
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div id="chat-bubbles">
                {convo.messages.map((message) => (
                  <Message key={message.author._id} item={message}></Message>
                ))}
              </div>
              <form id="chat-form" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="message"
                  value={formValues}
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
      )}

    </>
  );
}

export default Conversation;
