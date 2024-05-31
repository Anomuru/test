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

interface IMassage {
    user_id: number,
    chat_id: number,
    msg: string
}

const ChatRoom = () => {
    useEffect(() => {
        socket.onAny((eventName, ...args) => {
            getMessage(args[0].msg)
        })
    }, [])

    const navigate = useNavigate()
    const {roomID} = useParams<string>()
    const {request} = useHttp()
    const [value, setValue] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])
    const {id} = useSelector((state: IState) => state.user)

    function getMessage(value: IMassage): void {
        setMessages(prev => [...prev, value.msg])
    }

    function onSubmit(event: any): void {
        event.preventDefault();
        socket.emit('message',
            {
                user_id: id,
                chat_Id: Number(roomID),
                msg: value
            }
        );
        setValue('')
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
                {
                    messages.map(item => {
                        return <div>{item}</div>
                    })
                }
            </div>
            <form
                className={cls.room__input}
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    placeholder="Message"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <button>Enter</button>
            </form>
        </div>
    );
};

export default ChatRoom;