import React, {useEffect, useState} from 'react';
import styles from '../../App.module.scss';
import io from 'socket.io-client';
import MessagesList from '../components/chat-components/messages-list.component';
import MessageInput from '../components/chat-components/message-input.component';
import LoginInput from '../components/login-components/login-input.component';
import UsersList from '../components/login-components/users-list.component';
//import variables from '../../assets/colors.module.scss';

// to get color from sass files
// const CSS = {
//     backgroundColor: variables.red
// }

const App = () => {
    const [userChoice, setUserChoice] = useState(''); // to get the theme choose by the user
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        //  -> use local server if custom config is needed
        // const newSocket = io(`http://${window.location.hostname}:3000`);
        const newSocket = io(`https://whispering-chamber-09886.herokuapp.com`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

  return (
      <div>
          <LoginInput socket={socket}/>
          { socket ? (
              <div>
                  <UsersList socket={socket}/>
                  <MessagesList socket={socket} />
                  <MessageInput socket={socket} />
              </div>
          ) : (
              <div>You are not connected :( -> please try again</div>
          )}
      </div>
  );
};

export default App;
