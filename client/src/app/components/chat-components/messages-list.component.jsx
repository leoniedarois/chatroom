import { useEffect, useState } from 'react';

const MessagesList = ({socket}) => {

    const [messages, setMessages] = useState({});

    useEffect(() => {
        const historicListener = (messages) => {
            const cleanMessages = messages.filter(message => typeof message.value === "string");
            setMessages(cleanMessages);
        }

        const messageListener = (message) => {
            if (typeof(message.value) === "string") {
                setMessages((prevMessages) => {
                    const newMessages = {...prevMessages};
                    newMessages[message.id] = message;
                    return newMessages;
                });
            }
        };

        socket.on('messages', historicListener);
        socket.on('message', messageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]);

    return (
        <div>
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <div key={message.id} title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}>
                        <span>{message.user.name}:</span>
                        <span>{message.value}</span> as
                        <span>{new Date(message.time).toLocaleTimeString()}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default MessagesList;