import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSingleRoomRoute, deleteAllRoomRoute } from "../utils/APIRoutes";
import setAuthAxios from "../utils/useAuthFetch";

const initialState = {
  isLoading: false,
  myRooms: [],
  activeRoom: null,
  roomMsg: "",
  otherUser: {},
};

export const deleteSingleRoom = createAsyncThunk(
  "chatRoom/deleteSingleRoom",
  async (value, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!value || !token) return;
    const url = deleteSingleRoomRoute + value;
    try {
      const response = await setAuthAxios(token).delete(url);
      if (response.status === 200) {
        return value;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteAllRoom = createAsyncThunk(
  "chatRoom/deleteAllRoom",
  async (value, thunkAPI) => {
    const token = thunkAPI.getState().user.token;

    try {
      const response = await setAuthAxios(token).delete(deleteAllRoomRoute);
      if (resetRooms.status === 200) {
        return response.data.success;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    getMyRooms: (state, { payload }) => {
      state.myRooms = [...payload];
    },
    addRoom: (state, { payload }) => {
      state.myRooms = [payload, ...state.myRooms];
    },
    deteleOneRoom: (state, { payload }) => {
      state.myRooms = state.myRooms.filter((room) => room._id !== payload);
      state.activeRoom = null;
      state.otherUser = {};
    },
    setActiveRoom: (state, { payload }) => {
      const room = state.myRooms.find((room) => room._id === payload);
      state.activeRoom = room;
    },
    updateRoomInfo: (state, { payload }) => {
      const { _id } = payload;
      const room = state.myRooms.findIndex((r) => r._id === _id);
      state.myRooms[room] = payload;
    },
    setOtherUser: (state, { payload }) => {
      state.otherUser = payload;
    },
    resetRooms: (state) => {
      state.isLoading = false;
      state.myRooms = [];
      state.activeRoom = null;
      state.roomMsg = "";
    },
  },
  extraReducers: {
    [deleteSingleRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteSingleRoom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.myRooms = state.myRooms.filter((r) => r._id !== payload);
      state.activeRoom = null;
      state.otherUser = {};
    },
    [deleteSingleRoom.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteAllRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAllRoom.fulfilled]: (state) => {
      state.isLoading = false;
      state.activeRoom = null;
      state.myRooms = [];
      state.otherUser = {};
    },
    [deleteAllRoom.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getMyRooms,
  addRoom,
  setActiveRoom,
  resetRooms,
  deteleOneRoom,
  updateRoomInfo,
  setOtherUser,
} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
