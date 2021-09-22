import {designerTheme, developerTheme} from '../../../../assets/themes';
import {getFromLocalStorage, setToLocalStorage} from '../../../../utils/storage';
import styles from '../connexion-modal/connexion-modal.module.scss';
import RobotDes from '../../../../assets/img/robotDes.png';
import RobotDev from '../../../../assets/img/robotDev.png';
import classNames from 'classnames';
import {useState} from 'react';

// define roles :)
const ROLES = {DEVELOPER: "developer", DESIGNER: "designer"};

const ConnexionModal = ({socket, setTheme}) => {
  const [username, setUsername] = useState("");
  const [hideModal, setHideModal] = useState(false);
  const [connectedUser, setConnectedUser] = useState({id: "", username: "", role: ""});

  const modalToggle = classNames({
    [styles.modal]: true,
    [styles.hide]: hideModal
  });

  const imageClass = classNames({
    [styles.changeScale]: true,
    [styles.image]: true
  });


  const submitForm = () => {
    if (username !== "") {
      socket.emit("setUsername", username);
      setUsername("");
      setConnectedUser({id: socket.id, username, role: getFromLocalStorage('role')});
      setToLocalStorage('connectedUser', connectedUser);
      socket.emit("getUsers");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && username !== "") {
      submitForm();
      setHideModal(true);
    }
  };

  const changeUsername = (e) => setUsername(e.currentTarget.value);

  const addDeveloperRole = () => {
    setToLocalStorage('role', ROLES.DEVELOPER);
    setTheme(developerTheme);
  };

  const addDesignerRole = () => {
    setToLocalStorage('role', ROLES.DESIGNER);
    setTheme(designerTheme);
  };

  return (
    <div className={modalToggle}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperRole} onClick={addDesignerRole}>
          <div className={styles.desChoice}/>
          <img src={RobotDes} alt="robot designer" className={styles.image}/>
        </div>
        <div className={styles.wrapperRole} onClick={addDeveloperRole}>
          <div className={styles.devChoice}>
            <img src={RobotDev} alt="robot developer" className={imageClass}/>
          </div>
        </div>
      </div>
      <input className={styles.input} autoFocus value={username} placeholder="Define your pseudonyme" onChange={changeUsername}
             onKeyDown={handleKeyDown}/>
    </div>
  )
};

export default ConnexionModal;