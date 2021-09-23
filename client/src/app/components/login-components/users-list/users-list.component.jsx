import {useEffect, useState} from 'react';
import {getFromLocalStorage} from '../../../../utils/storage';
import styles from './users-list.module.scss';

const UsersList = ({socket}) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const username = getFromLocalStorage('connectedUser');

  useEffect(() => {
    const usersListener = (users) => {
      setConnectedUsers(users)
    };

    const userConnectedListener = (user) => {
      setConnectedUsers((prevUsers) => [...prevUsers, user])
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

    console.log(username, username.username);

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
        username.username !== "" && <h2>{username.username}</h2>
      }
      {connectedUsers && <p className={styles.title}>En ligne</p>}
      {connectedUsers
        .sort((a, b) => a.name - b.name)
        .map((user) => (
          <div className={styles.user} key={user.id}><span>{user.name}</span><br/></div>
        ))}
    </div>
  )
};

export default UsersList;