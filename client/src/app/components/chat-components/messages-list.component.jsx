import moment from 'moment';

const MessagesList = ({messages}) => {
  return (
    <div>
      {messages
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div key={message.id}>
            <span>{message.user.name}:</span>
            <span>{message.value}</span> at&nbsp;
            <span>{moment(message.time).format('DD/MM HH:mm')}</span>
            {message.isNew && <span>NEW</span>}
          </div>
        ))
      }
    </div>
  );
};

export default MessagesList;