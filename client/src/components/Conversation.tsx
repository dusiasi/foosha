import { useEffect, useState } from 'react';
import { postMessage } from '../services/messageService';
import { FaCommentDots, FaUser } from 'react-icons/fa6';
import './Conversation.css';
import Message from './Message';
import { useMainContext } from './Context';
import { formatDateTime } from '../services/utils';
import { getUserById } from '../services/userService';
import {
  User,
  Item,
  Conversation as ConversationType,
  Location,
  Message as MessageType,
} from '../types';

type propsType = {
  conversation: ConversationType;
};

function Conversation({ conversation }: propsType) {
  const {
    user,
    messageList,
    list,
    setMessageList,
    setConversationList,
    conversationList,
  } = useMainContext();

  const [showChat, setShowChat] = useState(false);
  const [formValues, setFormValues] = useState('');
  // const [conversationArr, setConversationArr] = useState<ConversationType[]>(
  //   []
  // );

  // changes in the form
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const message = e.target.value;
    setFormValues(message);
  }

  // send a new message
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();
    const newMessage: Omit<MessageType, '_id'> = {
      message: formValues,
      owner: conversation.owner,
      author: user,
      itemId: conversation._id,
      read: false,
      dateTime: Date.now(),
    };
    try {
      async function sendMessage() {
        const newMsg = await postMessage(newMessage);
        setFormValues('');
      }
      sendMessage();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        <div id="thread-with-chat">
          <div id="thread">
            <img src={conversation.item.image} id="thread-image" />
            <div id="thread-info">
              <h3>{conversation.item.title}</h3>
              {conversation.messages.map((message, i) =>
                i === conversation.messages.length - 1 ? (
                  <div id="last-message-info" key={i}>
                    <p>
                      {' '}
                      {conversation.messages.length} message
                      {conversation.messages.length > 1 ? 's' : ''}{' '}
                    </p>
                    <p>
                      last message: {formatDateTime(new Date(message.dateTime))}
                    </p>
                    {message.author._id != user._id ? (
                      <p id="your-turn-badge">{'your turn!'}</p>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )
              )}
            </div>

            {conversation.owner._id === user._id ? (
              <div id="contact-info">
                <img id="contact-image" src={conversation.sender.image}></img>
                <p id="contact-name">{conversation.sender.name}</p>
              </div>
            ) : conversation.sender._id === user._id ? (
              <div id="owner-info">
                <img id="owner-image" src={conversation.owner.image}></img>
                <p id="owner-name">{conversation.owner.name}</p>
              </div>
            ) : null}
          </div>

          <div className="messages-wrapper">
            <button
              id="chat-toggle-button"
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? 'hide chat ' : 'show chat '}
              <FaCommentDots></FaCommentDots>{' '}
            </button>

            {showChat ? (
              <div
                id="chat"
                style={{
                  ...(conversation.item.image && {
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${conversation.item.image})`,
                  }),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div id="chat-bubbles">
                  {conversation.messages.map((message) => (
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
                  <button
                    className="save-button button-turqouise"
                    type="submit"
                  >
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
