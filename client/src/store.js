import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import chatRoomReducer from './features/chatRoomSlice'

export const store =configureStore({
    reducer:{
        user:userReducer,
        chatRoom:chatRoomReducer
    }
})

