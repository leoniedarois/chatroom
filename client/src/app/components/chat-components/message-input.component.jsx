import {useState} from 'react';

const MessageInput = ({socket}) => {
  const [messageContent, setMessageContent] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', messageContent);
    setMessageContent('');
  };

  const changeMessage = (e) => setMessageContent(e.currentTarget.value);

  return (
    <form onSubmit={submitForm}>
      <input autoFocus value={messageContent} placeholder="Type something great" onChange={changeMessage}/>
    </form>
  );
};

export default MessageInput;