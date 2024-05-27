import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom"
import RegisterLogin from "pages/register_login/RegisterLogin";
import Chat from "pages/chat";
import ChatRoom from "pages/chat/chatRoom/ChatRoom";
// import {socket} from 'socket/socket';
// import {ConnectionState} from 'components/socket_io/connectionState/ConnectionState';
// import {ConnectionManager} from 'components/socket_io/connectionManager/ConnectionManager';
// import {Events} from "components/socket_io/events/Events";
// import {MyForm} from 'components/socket_io/myForm/MyForm';
//
// export default function App() {
//     const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
//     const [fooEvents, setFooEvents] = useState<string[]>([]);
//
//     useEffect(() => {
//         function onConnect(): void {
//             setIsConnected(true);
//         }
//
//         function onDisconnect(): void {
//             setIsConnected(false);
//         }
//
//         function onFooEvent(value: string): void {
//             setFooEvents(previous => [...previous, value]);
//         }
//
//         socket.on('connect', onConnect);
//         socket.on('disconnect', onDisconnect);
//         socket.on('foo', onFooEvent);
//
//         return () => {
//             socket.off('connect', onConnect);
//             socket.off('disconnect', onDisconnect);
//             socket.off('foo', onFooEvent);
//         };
//     }, []);
//
//     return (
//         <div className="App">
//             <ConnectionState isConnected={isConnected}/>
//             <Events events={fooEvents}/>
//             <ConnectionManager/>
//             <MyForm/>
//         </div>
//     );
// }

const App = () => {

    console.log("Hello World")

    return (
        <Routes>
            <Route path="/login" element={<RegisterLogin/>}/>
            <Route path="chat/*" element={<Chat/>}>
                <Route path={"room/:roomID"} element={<ChatRoom/>}/>
            </Route>
        </Routes>
    )
}

export default App