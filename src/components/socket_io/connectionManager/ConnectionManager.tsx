import React from 'react';
import { socket } from 'socket/socket';

export function ConnectionManager() {
    function connect(): void {
        socket.connect();
    }

    function disconnect(): void {
        socket.disconnect();
    }

    return (
        <>
            <button onClick={ connect }>Connect</button>
            <button onClick={ disconnect }>Disconnect</button>
        </>
    );
}