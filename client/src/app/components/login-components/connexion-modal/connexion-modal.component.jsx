import {designerTheme, developerTheme} from '../../../../assets/themes';
import {getFromLocalStorage, setToLocalStorage} from '../../../../utils/storage';
import styles from '../connexion-modal/connexion-modal.module.scss';
import RobotDes from '../../../../assets/img/robotDes.png';
import RobotDev from '../../../../assets/img/robotDev.png';
import Logo from '../../../../assets/img/logo.svg';
import classNames from 'classnames';
import {useState} from 'react';

// define roles :)
const ROLES = {DEVELOPER: "developer", DESIGNER: "designer"};

const ConnexionModal = ({socket, setTheme, theme}) => {
  const [username, setUsername] = useState("");
  const [hideModal, setHideModal] = useState(false);
  const [isActiveDev, setIsActiveDev] = useState(true);
  const [isActiveDes, setIsActiveDes] = useState(false);
  const [connectedUser, setConnectedUser] = useState({id: "", username: "", role: ""});

  const modalToggle = classNames({
    [styles.modal]: true,
    [styles.hide]: hideModal
  });

  const userActifDev = classNames({
    [styles.wrapperRole]: true,
    [styles.isActive]: isActiveDev
  });

  const userActifDes = classNames({
    [styles.wrapperRole]: true,
    [styles.isActive]: isActiveDes
  });

  const submitForm = () => {
    if (username !== "") {
      socket.emit("setUsername", username);
      setUsername("");
      setConnectedUser({id: socket.id, username, role: getFromLocalStorage('role')});
      setToLocalStorage('connectedUser', connectedUser);
      console.log(username)
      socket.emit("getUsers");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && username !== "" && theme !== "") {
      submitForm();
      setHideModal(true);
    }
  };

  const clickSendForm = () => {
    if (username !== "" && theme !== "") {
      submitForm();
      setHideModal(true);
    }
  }
  const changeUsername = (e) => setUsername(e.currentTarget.value);

  const addDeveloperRole = () => {
    setToLocalStorage('role', ROLES.DEVELOPER);
    setTheme(developerTheme);
    if(isActiveDes) {
      setIsActiveDes(false);
      setIsActiveDev(true);
    }
  };

  const addDesignerRole = () => {
    setToLocalStorage('role', ROLES.DESIGNER);
    setTheme(designerTheme);
    if(isActiveDev) {
      setIsActiveDev(false);
      setIsActiveDes(true);
    }
  };

  return (
    <div className={modalToggle}>
      <>
        <img className={styles.logo} src={Logo} alt="tech room text logo"/>
        <div className={styles.leftDecoration}>
          <svg className={'decoration'} width="233" height="188" viewBox="0 0 233 188" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="102.138" cy="93.0391" r="14.8885" stroke="white" strokeWidth="4.70164"/>
            <line x1="-2.50057" y1="73.8751" x2="88.3978" y2="91.1144" stroke="white" strokeWidth="3.91803"/>
            <circle cx="215.761" cy="76.5831" r="17.2393" fill="#88F1FF"/>
            <circle cx="188.239" cy="17.2393" r="17.2393" fill="#88F1FF"/>
            <line x1="-5.60871" y1="32.35" x2="198.881" y2="74.0345" stroke="white" strokeWidth="3.91803"/>
            <line x1="129.181" y1="60.1216" x2="174.63" y2="26.4265" stroke="white" strokeWidth="3.91803"/>
            <path d="M-2.8656 104.793L82.4059 121.06L88.7933 159.334L149.154 168.265" stroke="white"
                  strokeWidth="3.91803"/>
            <circle cx="164.826" cy="169.833" r="17.2393" fill="#88F1FF"/>
          </svg>
        </div>
        <div className={styles.bottomDecoration}>
          <svg className={'decoration'} width="201" height="195" viewBox="0 0 201 195" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="155.024" cy="59.6918" r="12.6454" transform="rotate(-102.281 155.024 59.6918)" stroke="white"
                    strokeWidth="3.9933"/>
            <circle cx="102.618" cy="125.591" r="12.6454" transform="rotate(-102.281 102.618 125.591)" stroke="white"
                    strokeWidth="3.9933"/>
            <circle cx="68.4341" cy="34.2679" r="14.6421" transform="rotate(-102.281 68.4341 34.2679)" fill="#FFA2F3"/>
            <line x1="105.618" y1="215.893" x2="103.503" y2="137.342" stroke="white" strokeWidth="3.32775"/>
            <line x1="71.7169" y1="225.975" x2="69.3676" y2="48.7369" stroke="white" strokeWidth="3.32775"/>
            <line x1="70.4139" y1="109.094" x2="34.2393" y2="77.4632" stroke="white" strokeWidth="3.32775"/>
            <path d="M131.343 210.61L129.438 136.904L160.048 124.689L156.555 72.9814" stroke="white"
                  strokeWidth="3.32775"/>
            <circle cx="23.4214" cy="71.4867" r="14.6421" transform="rotate(-102.281 23.4214 71.4867)" fill="#FFA2F3"/>
          </svg>
        </div>
        <div className={styles.background}/>
      </>

      <div className={styles.wrapper}>
        <div className={userActifDes} onClick={addDesignerRole}>
          <p className={`${styles.role} ${styles.leftRole}`}>designer</p>
          <div className={styles.desChoice}/>
          <img src={RobotDes} alt="robot designer avatar" className={styles.image}/>
        </div>
        <div className={userActifDev} onClick={addDeveloperRole}>
          <p className={`${styles.role} ${styles.rightRole}`}>developer</p>
          <div className={styles.devChoice}>
            <img src={RobotDev} alt="robot developer avatar" className={`${styles.changeScale} ${styles.image}`}/>
          </div>
        </div>
      </div>
      <input className={styles.input} autoFocus value={username} placeholder="Define your pseudonyme"
             onChange={changeUsername}
             onKeyDown={handleKeyDown}/>

      <div className={styles.enterButton} onClick={clickSendForm}>
        <svg className={'button'} width="125" height="125" viewBox="0 0 125 125" fill="none"
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
  )
};

export default ConnexionModal;