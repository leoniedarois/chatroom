import {useState} from 'react';
import styles from './message-input.module.scss';
import classNames from 'classnames';

const MessageInput = ({socket, onRead}) => {
  const [messageContent, setMessageContent] = useState('');

  const inputClass = classNames({
    [styles.input]: true,
    'messageInput': true
  });

  const buttonClass = classNames({
    [styles.buttonSize]: true,
    'button': true
  });

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

  const removeNotifications = () => {
    const input = document.querySelector('.messageInput');
    if (input === document.activeElement) {
      onRead();
    }
  }

  const clickSendForm = () => {
    if (messageContent !== "") {
      submitForm();
    }
  }


  return (
    <div className={styles.sendBar}>
      <div>
        <input className={inputClass} autoFocus value={messageContent} placeholder="Send a message in the tchat" onChange={changeMessage}
               onKeyDown={handleKeyDown} onFocus={removeNotifications}/>
      </div>
      <div onClick={clickSendForm}>
        <svg className={buttonClass} width="125" height="125" viewBox="0 0 125 125" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M82.3919 103.702C89.2807 100.079 95.0718 94.6752 99.1615 88.053C103.251 81.4307 105.49 73.8327 105.644 66.0509C105.799 58.269 103.863 50.5882 100.039 43.8089C96.2155 37.0296 90.6434 31.4 83.9037 27.5068"
            stroke="#B0C1E6" strokeWidth="2.17124" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M23.751 43.293C19.6279 50.4374 17.6206 58.6066 17.9632 66.8483C18.3059 75.0899 20.9843 83.0644 25.6861 89.8419C30.388 96.6194 36.9196 101.921 44.5195 105.128C52.1193 108.335 60.4742 109.315 68.6101 107.955"
            stroke="#B0C1E6" strokeWidth="2.17124" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M77.353 38.0721C73.7644 36.1016 69.5166 34.991 64.9838 34.8381C60.451 34.6852 55.7723 35.4947 51.3595 37.1953"
            stroke="#B0C1E6" strokeWidth="1.44749" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M74.7923 22.408C71.2036 20.4375 66.9559 19.3269 62.4231 19.174C57.8903 19.0211 53.2115 19.8306 48.7987 21.5312"
            stroke="#B0C1E6" strokeWidth="2.17124" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M27.0027 67.0366C26.7583 72.075 27.6802 76.9199 29.687 81.1446C31.6939 85.3694 34.7242 88.8444 38.5111 91.2636"
            stroke="#B0C1E6" strokeWidth="2.17124" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M69.9471 98.5413C75.6848 97.3531 81.034 94.748 85.5072 90.9633C89.9804 87.1785 93.4354 82.3345 95.5572 76.8727C97.6791 71.4109 98.4004 65.5049 97.6555 59.693C96.9105 53.8811 94.7229 48.348 91.2921 43.5979C87.8613 38.8478 83.2963 35.0318 78.0132 32.4976C72.73 29.9635 66.8967 28.7917 61.0448 29.0891C55.1928 29.3865 49.5083 31.1436 44.5093 34.2003C39.5103 37.257 35.3557 41.5162 32.4241 46.5896"
            stroke="#B0C1E6" strokeWidth="2.17124" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M36.7917 52.086C35.4167 54.7758 34.7196 57.8014 34.762 60.8966C34.8044 63.9917 35.5848 67.0614 37.0347 69.8354"
            stroke="#B0C1E6" strokeWidth="1.44749" strokeMiterlimit="10" strokeLinecap="round"/>
          <path
            d="M87.0297 79.2362C85.9433 82.055 84.1544 84.5927 81.8205 86.6261C79.4865 88.6594 76.6791 90.1259 73.6454 90.8964"
            stroke="#B0C1E6" strokeWidth="1.44749" strokeMiterlimit="10" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default MessageInput;