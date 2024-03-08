import './Message.css';
import { formatDateTime } from '../services/utils';
import { useMainContext } from "./Context";
import {
  User,
  Item,
  Conversation as ConversationType,
  Location,
  Message as MessageType,
} from "../types";

function Message({ item: conversation }: { item: ConversationType }) {
  const { user } = useMainContext();

  return (
    <>
      {item.author === user._id ? (
        <div className="message" id="message-outbound">
          <p className="message-text">{item.message}</p>
          <p id="message-timestamp">{formatDateTime(item.dateTime)}</p>
        </div>
      ) : (
        <div className="message" id="message-inbound">
          <p className="message-text">{item.message}</p>
          <p id="message-timestamp">{formatDateTime(item.dateTime)}</p>
        </div>
      )}
    </>
  );
}

export default Message;