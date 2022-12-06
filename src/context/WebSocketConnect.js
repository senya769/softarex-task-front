import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';


const SOCKET_URL = 'http://localhost:9090/web-test/ws';

const WebSocketConnect = () => {
    const [message, setMessage] = useState();
    let url = null
    var sock = new SockJS(SOCKET_URL)

    var stomp = Stomp.over(sock)

    useEffect(() => {
        console.log(sock)
        sock.onopen = () => {
            console.log("open")
        }
        stomp.connect({}, ()=> {
            stomp.subscribe('/topic/questions', (msg)=>{
                setMessage(JSON.parse(msg.body))
            });
        })
    }, [])


    return (
        <div>
            <div>{message}</div>
        
        </div>
    );
}

export default WebSocketConnect