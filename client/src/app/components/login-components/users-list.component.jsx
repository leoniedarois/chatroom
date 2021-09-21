import {useEffect, useState} from 'react';

const UsersList = ({socket}) => {
  const [connectedUsers, setConnectedUsers] = useState({});

  useEffect(() => {
    const usersListener = (users) => {
      setConnectedUsers(users)
    };

    const deleteUserListener = (userId) => {
      setConnectedUsers((prevUsers) => {
        if (userId) {
          return prevUsers.filter(user => user.id !== userId.id)
        }
      });
    }

    socket.on("users", usersListener);
    // TODO -> get connexion socket.on("userConnection", addUserListener);
    socket.on("userDisconnection", deleteUserListener);
    socket.emit("getUsers");

    return () => {
      socket.off("users", usersListener);
      socket.off("deleteUser", deleteUserListener);
    };
  }, [socket]);

  return (
    <div>
      {[...Object.values(connectedUsers)]
        .sort((a, b) => a.name - b.name)
        .map((user) => (
          <div key={user.id}><span>{user.name}</span><br/></div>
        ))}
    </div>
  )
};

export default UsersList;