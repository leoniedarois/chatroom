import {useEffect, useState} from 'react';
import io from 'socket.io-client'
import UsersList from '../components/login-components/users-list/users-list.component';
import Chat from './chat.container';
import {ThemeProvider} from 'styled-components';
import {developerTheme} from '../../assets/themes';
import {GlobalStyles} from '../../assets/global';
import ConnexionModal from '../components/login-components/connexion-modal/connexion-modal.component';
import styles from './containers.module.scss';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [theme, setTheme] = useState(developerTheme);
  const [username, setUsername] = useState("");

  useEffect(() => {
    //  -> use local server if custom config is needed
    // const newSocket = io(`http://${window.location.hostname}:3000`);
    const newSocket = io(`https://whispering-chamber-09886.herokuapp.com`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket, theme]);

  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles/>
            <ConnexionModal socket={socket} setTheme={setTheme} theme={theme}/>
            {socket ? (
              <div className={styles.wrapper}>
                <div className={styles.blur}/>
                <Chat socket={socket}/>
                <UsersList socket={socket}/>
              </div>
            ) : (
              <div>You are not connected :( -> please try again</div>
            )}
          </>
        </ThemeProvider>
      }
    </>
  );
};

export default App;
