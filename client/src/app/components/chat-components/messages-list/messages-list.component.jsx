import moment from 'moment';
import styles from './messages-list.module.scss';
import {useEffect, useRef} from 'react';
import classNames from 'classnames';
import {ROLES} from '../../login-components/connexion-modal/connexion-modal.component';

const MessagesList = ({messages, socket}) => {
  const messageEndRef = useRef(null);

  const currentUserMessage = classNames({
    [styles.message]: true,
    'userMessages': true
  });

  const devUsername = classNames({
    [styles.devName]: true,
    'username': true
  });

  const desUsername = classNames({
    [styles.desName]: true,
    'username': true
  });

  const currentUsername = classNames({
    [styles.currentUsername]: true,
    'username': true
  });

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
          // TODO FIX BUG AND CHANGE ORDER
          const otherMessages = message.user.role === ROLES.DEVELOPER ? `${styles.message} ${styles.desMessages}` : `${styles.message} ${styles.devMessages}`;
          const otherUsername = message.user.role === ROLES.DEVELOPER ? desUsername : devUsername;
          //console.log(message.user.role);
          return (
            <div key={message.id}>
              {message.value !== "" &&
              <>
                {message.isNew &&
                <svg className={'notification'} width="120" height="74" viewBox="0 0 120 74" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <circle cx="101.364" cy="37.3658" r="13.5454" transform="rotate(24.2176 101.364 37.3658)"
                          fill="#FFA2F3"/>
                  <path d="M89.2738 37.1345L-0.999997 37.1345" stroke="#CBD9FA" strokeWidth="4.41282"/>
                </svg>
                }
                <div className={styles.wrapper} onClick={() => console.log(message.user.role === ROLES.DEVELOPER, ROLES.DEVELOPER)}>
                  <div className={isActualUser ? currentUsername : otherUsername}>
                    <span>{message.user.name}</span>
                    <span className={styles.time}>{moment(message.time).format('HH:mm')}</span>
                  </div>
                  <div>
                    <div className={isActualUser ? currentUserMessage : otherMessages}>{message.value}</div>
                  </div>
                </div>
                <br/>
              </>
              }
            </div>

          )
        })
      }
      <div ref={messageEndRef} className="scroll-down"/>
    </div>
  );
};

export default MessagesList;