import Conversation from '../components/Conversation';
import { useMainContext } from '../components/Context';
import './Messages.css';

function Messages() {
  const { user, conversationList } = useMainContext();

  console.log(conversationList); //logs it
  conversationList.map((elem) => {
    console.log(elem);
    console.log(elem.owner), console.log(elem.contact);
  });

  console.log(user);
  console.log(user._id);
  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container">
        {!conversationList.length ? (
          <p>Slide into their DMs! 💚</p>
        ) : (
          conversationList.map((elem) =>
            elem.owner === user._id || elem.contact === user._id ? (
              <Conversation key={elem._id} item={elem}></Conversation>
            ) : null
          )
        )}
      </div>
    </>
  );
}

export default Messages;
