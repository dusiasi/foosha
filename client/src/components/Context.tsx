import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';
import { getAllItems } from '../services/itemService';
import { getAllConversations } from '../services/conversationService';
import { getAllMessages } from '../services/messageService';
import { fetchUserLocation } from '../services/mapApiService';
import { sortByDate } from '../services/utils';
import { User, Item, Message, Conversation, Location } from '../types';

type MainContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  list: List;
  setList: Dispatch<SetStateAction<List>>;
  conversationList: ConversationList;
  setConversationList: Dispatch<SetStateAction<ConversationList>>;
  messageList: MessageList;
  setMessageList: Dispatch<SetStateAction<MessageList>>;
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
};

type MessageList = Message[];
type List = Item[];

type ConversationList = Conversation[];

const initalUser = {
  name: '',
  email: '',
  password: '',
  status: '',
  image: '',
  preferences: [],
};

const initialLocation = {
  lat: 0,
  lng: 0,
};

const initialContext = {
  user: initalUser,
  setUser: () => {},
  list: [],
  setList: () => {},
  conversationList: [],
  setConversationList: () => {},
  messageList: [],
  setMessageList: () => {},
  location: initialLocation,
  setLocation: () => {},
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(initalUser);
  const [list, setList] = useState<List>([]);
  const [conversationList, setConversationList] = useState<ConversationList>(
    []
  );
  const [messageList, setMessageList] = useState<MessageList>([]);
  const [location, setLocation] = useState(initialLocation);
  // init of the app:
  // fetch location of user
  // fetch data lists
  useEffect(() => {
    async function fetchAndSet() {
      fetchUserLocation(setLocation);
      const itemData = await getAllItems();
      const convoData = await getAllConversations();
      const messageData = await getAllMessages();
      const sortedItems = sortByDate(itemData, 'date');
      const sortedConvos = sortByDate(convoData, 'date');
      const sortedMessages = sortByDate(messageData, 'dateTime');
      setList(sortedItems);
      setConversationList(sortedConvos);
      setMessageList(sortedMessages);
    }
    fetchAndSet();
  }, []);
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        list,
        setList,
        conversationList,
        setConversationList,
        messageList,
        setMessageList,
        location,
        setLocation,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export function useMainContext() {
  return useContext(MainContext);
}
