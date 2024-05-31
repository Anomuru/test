import {io} from "socket.io-client"

// "undefined" means the URL will be computed from the `window.location` object
const URL: unknown =  process.env.NODE_ENV === 'production' ? undefined : 'http://192.168.0.105:5003';

// @ts-ignore
export const socket = io(URL, {
    autoConnect: false
});
