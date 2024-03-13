import Conversation from '../components/Conversation';
import { useState, useEffect } from 'react';
import { useMainContext } from '../components/Context';
import './Messages.css';
import {
  User,
  Item,
  Conversation as ConversationType,
  Location,
  Message as MessageType,
} from '../types';

function Messages() {
  const { user, list } = useMainContext();
  const [conversationArr, setConversationArr] = useState<ConversationType[]>([]);

  useEffect(() => {
    const mappedItems = list.flatMap((item) => item.conversations);
    const filteredConvos = mappedItems.filter(
      (convo) => convo.sender._id === user._id || convo.owner._id === user._id
    );

    setConversationArr(filteredConvos);
  }, [list]);
console.log(conversationArr)

  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container">
        {!list.length ? (
          <p>Slide into their DMs! 💚</p>
        ) : (
          conversationArr.map((conversation, i) => (
            <Conversation key={i} conversation={conversation} ></Conversation>
          ))
        )}
      </div>
    </>
  );

}

export default Messages;
