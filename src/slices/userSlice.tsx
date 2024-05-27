import {createSlice} from "@reduxjs/toolkit";

interface IInitial {
    id: null | number,
    username: null | string,
    userLoadingStatus: string
}

const initialState: IInitial = {
    id: null,
    username: null,
    userLoadingStatus: "idle"
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchingUser: (state) => {
            state.userLoadingStatus = "loading"
        },
        fetchedUser: (state, action) => {
            state.userLoadingStatus = "success"
            state.id = action.payload.id
            state.username = action.payload.username
        },
        fetchedError: (state) => {
            state.userLoadingStatus = "error"
        }
    }
})

const {actions, reducer} = UserSlice
export default reducer

export const {
    fetchingUser,
    fetchedUser,
    fetchedError
} = actions