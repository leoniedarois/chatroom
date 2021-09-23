import {useEffect, useState} from 'react';
import MessagesList from '../components/chat-components/messages-list/messages-list.component';
import MessageInput from '../components/chat-components/message-input/message-input.component';
import styles from './containers.module.scss';
import RobotDes from '../../assets/img/robotDes.png';
import RobotDev from '../../assets/img/robotDev.png';

const Chat = ({socket, currentUser}) => {
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
    <div className={styles.chat}>
      <div className={styles.decoration}>
        {currentUser.role === "developer" ? <img className={styles.image} src={RobotDev} alt="robot developer avatar"/> :
          <img  className={styles.image} src={RobotDes} alt="robot designer avatar"/>}
      </div>
      <MessagesList messages={messages} socket={socket}/>
      <MessageInput onRead={onRead} socket={socket}/>
    </div>
  );
};

export default Chat;