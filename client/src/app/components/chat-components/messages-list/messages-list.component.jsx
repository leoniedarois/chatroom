import moment from 'moment';
import styles from './messages.module.scss';

const MessagesList = ({messages, socket}) => {
  return (
    <div>
      {messages
        .sort((a, b) => a.time - b.time)
        .map((message) => {
          const isActualUser = socket.id === message.user.id;
          return (
            <div key={message.id} className={isActualUser ? styles.userMessages : styles.otherMessages}>
              <span>{message.user.name}:</span>
              <span>{message.value}</span> at&nbsp;
              <span>{moment(message.time).format('HH:mm')}</span>
              {message.isNew && <span>NEW</span>}
            </div>
          )
        })
      }
    </div>
  );
};

export default MessagesList;