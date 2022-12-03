import './App.css';
import { useState } from 'react';
import { StompSocketState } from '@stomp/stompjs'; 


const SOCKET_URL = 'http://localhost:9090/web-test/ws';

function App() {
  const [message, setMessage] = useState('You server message here.');

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }
  return (
    <div>
      <StompSocketState
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
}

export default App;
