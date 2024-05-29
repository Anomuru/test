import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {socket} from "socket/socket";
import {useHttp} from "hooks/http.hook";
import {BackURL} from "constants/constants";
import {IState} from "interfaces";

import cls from "./style.module.sass";
import DefaultPersonImg from "assets/userImages/Unknown_person.jpg"
import {fetchedChat} from "slices/chatSlices";

const Chat = () => {
    useEffect(() => {
        request(`${BackURL}get_chat/${id}`)
            .then(res => {
                console.log(res)
                dispatch(fetchedChat(res))
            })
            .catch(err => console.log(err))
    }, [])

    const {request} = useHttp()
    const dispatch = useDispatch()
    const {id, username} = useSelector((state: IState) => state.user)
    const {userChats} = useSelector((state: IState) => state.chat)

    function connect(roomID: number) {
        socket.connect().send({user_id: id, chat_id: roomID})
        socket.on("connect", () => ({user_id: id, chat_id: roomID}))
    }

    return (
        <div className={cls.main}>
            <div className={cls.main__menu}>
                <div className={cls.head}>
                    <div className={cls.head__info}>
                        <img src={DefaultPersonImg} alt=""/>
                        <p>{username}</p>
                    </div>
                    <i className="fas fa-ellipsis-v"/>
                </div>
                <div className={cls.list}>
                    <ul className={cls.list__items}>
                        {
                            userChats.map(item => {
                                return (
                                    <li
                                        className={cls.item}
                                        onClick={() => connect(item.id)}
                                    >
                                        <div className={cls.item__link}>
                                            <Link to={`/chat/room/${item.id}`}>
                                                <img
                                                    className={cls.item__img}
                                                    src=""
                                                    alt=""
                                                />
                                            </Link>
                                            <p>{item.username}</p>
                                        </div>
                                        <span className={cls.item__status}>online</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={cls.main__exit}>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default Chat;