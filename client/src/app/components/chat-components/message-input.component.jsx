import {useState} from 'react';

const MessageInput = ({socket, onRead}) => {
  const [messageContent, setMessageContent] = useState('');

  const submitForm = () => {
    if (messageContent !== "") {
      socket.emit('message', messageContent);
      setMessageContent('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onRead();
      submitForm();
    }
  }
  const changeMessage = (e) => setMessageContent(e.currentTarget.value);

  return (
    <div>
      <input autoFocus value={messageContent} placeholder="Type something great" onChange={changeMessage}
             onKeyDown={handleKeyDown}/>
    </div>
  );
};

export default MessageInput;