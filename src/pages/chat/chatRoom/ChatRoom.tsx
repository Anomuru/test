import React, {useEffect, useState} from 'react';
// import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import {socket} from "socket/socket";
import {IState} from "interfaces";
import {useHttp} from "hooks/http.hook";
import {BackURL} from "constants/constants";

import cls from "./style.module.sass"
import DefaultPersonImg from "assets/userImages/Unknown_person.jpg"

const ChatRoom = () => {
    // useEffect(() => {
    //     request(`${BackURL}`)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }, [])

    const navigate = useNavigate()
    const {roomID} = useParams()
    const {request} = useHttp()
    const [value, setValue] = useState<string>()
    const {id} = useSelector((state: IState) => state.user)

    function onSubmit(event: any): void {
        event.preventDefault();
        socket.timeout(5000).emit('message', value);
    }

    function disconnect() {
        socket.disconnect().emit("message", id, roomID)
        navigate("/chat")
    }

    return (
        <div className={cls.room}>
            <div className={cls.room__header}>
                <div className={cls.userInfo}>
                    <img src={DefaultPersonImg} alt=""/>
                    <p>online</p>
                </div>
                <button onClick={disconnect}>Back</button>
            </div>
            <div className={cls.room__messages}>

            </div>
            <form
                className={cls.room__input}
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    placeholder="Message"
                    onChange={(e) => setValue(e.target.value)}
                />
                <button>Enter</button>
            </form>
        </div>
    );
};


// const [value, setValue] = useState<string>('');
// const [isLoading, setIsLoading] = useState<boolean>(false);
//
// function onSubmit(event: any) {
//     event.preventDefault();
//     setIsLoading(true);
//
//     socket.timeout(5000).emit('message', value, () => {
//         setIsLoading(false);
//     });
// }
//
// return (
//     <form onSubmit={ onSubmit }>
//         <input onChange={ e => setValue(e.target.value) } />
//
//         <button type="submit" disabled={ isLoading }>Submit</button>
//     </form>
// );


export default ChatRoom;