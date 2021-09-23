import moment from 'moment';
import styles from './messages-list.module.scss';
import {useEffect, useRef} from 'react';

const MessagesList = ({messages, socket}) => {
  const messageEndRef = useRef(null);

  const scrollDown = () => {
    messageEndRef.current.scrollIntoView({behavior: "smooth"});
  };

  useEffect(scrollDown, [messages]);

  return (
    <div className={styles.messageList}>
      {messages
        .sort((a, b) => a.time - b.time)
        .map((message) => {
          const isActualUser = socket.id === message.user.id;
          return (
            <div key={message.id}>
              {message.isNew &&
                <svg className={'notification'} width="120" height="74" viewBox="0 0 120 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="101.364" cy="37.3658" r="13.5454" transform="rotate(24.2176 101.364 37.3658)" fill="#FFA2F3"/>
                  <path d="M89.2738 37.1345L-0.999997 37.1345" stroke="#CBD9FA" strokeWidth="4.41282"/>
                </svg>
              }
              <div className={isActualUser ? 'userMessages' : 'devMessages'}>
                <span>{message.user.name}:</span>
                <span>{moment(message.time).format('HH:mm')}</span>
                <span>{message.value}</span>
              </div>
              <br/>
            </div>
          )
        })
      }
      <div ref={messageEndRef} className="scroll-down"/>
    </div>
  );
};

export default MessagesList;