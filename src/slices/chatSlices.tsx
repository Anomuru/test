import {createSlice} from "@reduxjs/toolkit";

interface IInitial {
    userChats: [],
    contacts: [],
    chatLoadingStatus: string
}

const initialState: IInitial = {
    userChats: [],
    contacts: [],
    chatLoadingStatus: "idle"
}

const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        fetchingChat: (state) => {
            state.chatLoadingStatus = "loading"
        },
        fetchedChat: (state, action) => {
            state.chatLoadingStatus = "success"
            state.userChats = action.payload.user_chats
            state.contacts = action.payload.contacts
        },
        fetchedError: (state) => {
            state.chatLoadingStatus = "error"
        }
    }
})

const {actions, reducer} = ChatSlice
export default reducer

export const {
    fetchingChat,
    fetchedChat,
    fetchedError
} = actions