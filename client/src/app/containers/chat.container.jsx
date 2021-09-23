import React, {useEffect, useState} from 'react';
import MessagesList from '../components/chat-components/messages-list/messages-list.component';
import MessageInput from '../components/chat-components/message-input.component';
import styles from './containers.module.scss';

const Chat = ({socket}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const historicMessagesListener = (messages) => {
      const cleanMessages = messages.filter(message => typeof message.value === "string");
      setMessages(cleanMessages);
    }

    const messagesListener = (message) => {
      if (typeof (message.value) === "string") {
        setMessages((prevMessages) => {
          if (message.user.id !== socket.id) {
            message["isNew"] = true;
          }
          return [...prevMessages, message];
        });
      }
    };

    socket.on('messages', historicMessagesListener);
    socket.on('message', messagesListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messagesListener);
    };
  }, [socket]);

  const onRead = () => {
    setMessages((prevMessages) => {
      return prevMessages.map((message) => ({...message, isNew: false}))
    })
  }
  return (
    <>
      <MessagesList messages={messages} socket={socket}/>
      <MessageInput onRead={onRead} socket={socket}/>
    </>
  );
};

export default Chat;