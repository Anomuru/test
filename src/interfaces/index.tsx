import React from "react";

interface IUser {
    readonly id: number | string
    readonly username: string,
    userLoadingStatus: string
}

interface IUserChats {
    id: number,
    username: string,
    date: string,
    count: number,
    img: null | string,
    last_msg: string
}

interface IChatItem {
    userChats: IUserChats[],
    contacts: Array<unknown>,
    chatLoadingStatus: string
}

export interface IState {
    user: IUser,
    chat: IChatItem,
}