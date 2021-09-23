import {useEffect, useState} from 'react';
import styles from './users-list.module.scss';
import DesAvatar from '../../../../assets/img/avatarDesFull.png';
import DevAvatar from '../../../../assets/img/avatarDevFull.png';

const UsersList = ({socket, currentUser}) => {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const usersListener = (users) => {
      const cleanUsers = users.map((user) => {
        return {
          ...user,
          role: user.role !== ('developer' || 'designer') && 'developer'
        }
      })
      setConnectedUsers(cleanUsers);
    };

    const userConnectedListener = (user) => {
      const cleanUser = {...user, role: user.role !== ('developer' || 'designer') && 'developer'};
      setConnectedUsers((prevUsers) => [...prevUsers, cleanUser]);
    }

    const updateUsername = (newUser) => {
      setConnectedUsers((prevUsers) => {
        return prevUsers.map((user) => {
          return user.id === newUser.id ? newUser : user;
        })
      })
    };

    const deleteUserListener = (userId) => {
      setConnectedUsers((prevUsers) => {
        if (userId) {
          return prevUsers.filter(user => user.id !== userId.id)
        }
      });
    }

    socket.on("userConnection", userConnectedListener);
    socket.on("updateUsername", updateUsername);
    socket.on("users", usersListener);
    socket.on("userDisconnection", deleteUserListener);
    socket.emit("getUsers");

    return () => {
      socket.off("users", usersListener);
      socket.off("deleteUser", deleteUserListener);
    };
  }, [socket]);

  return (
    <div className={styles.userList}>
      {
        currentUser.name !== "" &&
        <div className={styles.avatar}>
          <h2 className={styles.userName}>{currentUser.name}</h2>
          <div>
            {currentUser.role === "developer" ? <img src={DevAvatar} alt="avatar"/> : <img src={DesAvatar} alt="avatar"/>}
          </div>
        </div>
      }
      {connectedUsers && <p className={styles.title}>En ligne</p>}
      {connectedUsers
        .sort((a, b) => a.name - b.name)
        .map((user) => (
          <div className={styles.avatar} key={user.id}>
            <span className={styles.user}>{user.name}</span>
            {user.role === "developer" ? <img src={DevAvatar} alt="avatar"/> : <img src={DesAvatar} alt="avatar"/>}
            <br/>
          </div>
        ))}
    </div>
  )
};

export default UsersList;