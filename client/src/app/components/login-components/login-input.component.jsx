import {useState} from 'react';

const LoginInput = ({socket}) => {
    const [username, setUsername] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit("setUsername", username);
        setUsername("");
        socket.emit("getUsers");
    };

    const changeUsername = (e) => setUsername(e.currentTarget.value);

    return (
        <form onSubmit={submitForm}>
            <input autoFocus value={username} placeholder="Choose your username" onChange={changeUsername}/>
        </form>
    );
};

export default LoginInput;