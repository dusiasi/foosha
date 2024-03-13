import Conversation from '../components/Conversation';
import { useMainContext } from '../components/Context';
import './Messages.css';

function Messages() {
  const { user, list } = useMainContext();

  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container">
        {!list.length ? (
          <p>Slide into their DMs! 💚</p>
        ) : (
          list.map((item) => <Conversation key={item._id}></Conversation>)
        )}
      </div>
    </>
  );
}

export default Messages;
