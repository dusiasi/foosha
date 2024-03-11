import Conversation from '../components/Conversation';
import { useMainContext } from '../components/Context';
import './Messages.css';

function Messages() {
  const { user, conversationList } = useMainContext();

  console.log(conversationList); //logs it
  conversationList.map((elem) => {
    console.log(elem.owner._id), console.log(elem.contact);
    console.log(user._id);
    if (elem.owner === user._id || elem.contact === user._id)
      console.log('hey');
    else console.log('something wrong');
  });

  console.log(user);
  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container">
        {!conversationList.length ? (
          <p>Slide into their DMs! 💚</p>
        ) : (
          conversationList.map((elem) =>
            elem.owner._id === user._id || elem.contact._id === user._id ? (
              <Conversation key={elem._id} item={elem}></Conversation>
            ) : null
          )
        )}
      </div>
    </>
  );
}

export default Messages;
