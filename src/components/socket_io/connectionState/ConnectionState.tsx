import React from 'react';

export function ConnectionState({isConnected}: { isConnected:boolean }): JSX.Element {
    return <p>State: { '' + isConnected }</p>;
}