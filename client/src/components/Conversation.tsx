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

function Conversation({ item: item }: { item: Item }) {
  const [showChat, setShowChat] = useState(false);
  const [messagesByConversation, setMessagesByConversation] = useState<
    MessageType[]
  >([]);

  const {
    user,
    messageList,
    list,
    setMessageList,
    setConversationList,
    conversationList,
  } = useMainContext();

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
      // owner: item.owner,
      author: user._id,
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

  // show the messages belonging to each conversation
useEffect(() => {
  const mappedConversations = list.map((item) => item.conversations).flat();
  console.log(mappedConversations);
  setConversationArr(mappedConversations);
}, [list]);

  // show the contact info on the conversation
  // useEffect(() => {
  //   async function getOwnerAndContact(id: string) {
  //     const itemOwner = await getUserById(conversation.owner._id);
  //     const itemContact = await getUserById(conversation.contact._id);
  //     const updatedConversationList = conversationList.filter(
  //       (convo) => convo._id !== conversation._id
  //     );
  //     setConversationList([
  //       ...updatedConversationList,
  //       { ...conversation, contact: itemContact, owner: itemOwner },
  //     ]);
  //   }
  //   getOwnerAndContact(conversation._id);
  // }, []);

  // return (
  //   <>
  //     <div id="thread-with-chat">
  //       <div id="thread">
  //         <img src={conversation.itemImage} id="thread-image" />
  //         <div id="thread-info">
  //           <h3>{conversation.itemName}</h3>
  //           {messagesByConversation.map((elem, i) =>
  //             i === messagesByConversation.length - 1 ? (
  //               <div id="last-message-info" key={i}>
  //                 <p>
  //                   {" "}
  //                   {messagesByConversation.length} message
  //                   {messagesByConversation.length > 1 ? "s" : ""}{" "}
  //                 </p>
  //                 <p>last message: {formatDateTime(new Date(elem.dateTime))}</p>
  //                 {elem.author != user._id ? (
  //                   <p id="your-turn-badge">{"your turn!"}</p>
  //                 ) : (
  //                   ""
  //                 )}
  //               </div>
  //             ) : (
  //               ""
  //             )
  //           )}
  //         </div>
  //         {conversation.owner._id === user._id ? ( // changed to _id
  //           <div id="contact-info">
  //             <img id="contact-image" src={conversation.contact.image}></img>
  //             <p id="contact-name">{conversation.contact.name}</p>
  //           </div>
  //         ) : conversation.contact._id === user._id ? (
  //           <div id="owner-info">
  //             <img id="owner-image" src={conversation.owner.image}></img>
  //             <p id="owner-name">{conversation.owner.name}</p>
  //           </div>
  //         ) : null}
  //       </div>
  //       <div>
  //         <button
  //           id="chat-toggle-button"
  //           onClick={() => setShowChat(!showChat)}
  //         >
  //           {showChat ? "hide chat " : "show chat "}
  //           <FaCommentDots></FaCommentDots>{" "}
  //         </button>
  //         {showChat ? (
  //           <div
  //             id="chat"
  //             style={{
  //               ...(conversation.itemImage && {
  //                 backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${conversation.itemImage})`,
  //               }),
  //               backgroundSize: "cover",
  //               backgroundPosition: "center",
  //               backgroundRepeat: "no-repeat",
  //             }}
  //           >
  //             <div id="chat-bubbles">
  //               {messagesByConversation.map((elem) => (
  //                 <Message key={elem.author} item={elem}></Message>
  //               ))}
  //             </div>
  //             <form id="chat-form" onSubmit={submitHandler}>
  //               <input
  //                 type="text"
  //                 name="message"
  //                 value={formValues.message}
  //                 onChange={changeHandler}
  //                 placeholder="Be nice!"
  //               />
  //               <button className="save-button button-turqouise" type="submit">
  //                 Send
  //               </button>
  //             </form>
  //           </div>
  //         ) : null}
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Conversation;
