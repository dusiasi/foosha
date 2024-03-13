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

function Message({ item: item }: { item: MessageType}) {
  const { user } = useMainContext();

  return (
    <>
      {item.author._id === user._id ? (
        <div className="message" id="message-outbound">
          <p className="message-text">{item.message}</p>
          <p id="message-timestamp">{formatDateTime(new Date(item.dateTime))}</p>
        </div>
      ) : (
        <div className="message" id="message-inbound">
          <p className="message-text">{item.message}</p>
          <p id="message-timestamp">{formatDateTime(new Date (item.dateTime))}</p>
        </div>
      )}
    </>
  );
}

export default Message;