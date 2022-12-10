import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serAuthAxios from "../utils/useAuthFetch";
import { uploadHeaderRoute, updateUserRoute } from "../utils/APIRoutes";

const initialState = {
  username: "",
  email: "",
  userId: "",
  headerImg: "",
  token: "",
  isLoading: false,
};
getUserFromLocal();
function getUserFromLocal() {
  const localtoken = localStorage.getItem("token");
  if (localtoken) {
    const { email, username, _id, headerImg } = JSON.parse(
      localStorage.getItem("user")
    );
    const token = JSON.parse(localtoken);
    initialState.username = username;
    initialState.email = email;
    initialState.userId = _id;
    initialState.headerImg = headerImg;
    initialState.token = token;
  }
}

export const uploadHeader = createAsyncThunk(
  "/user/uploadHeader",
  async (value, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const { img } = value;
    const formData = new FormData();
    formData.append("file", img);
    try {
      const response = await serAuthAxios(token).post(
        uploadHeaderRoute,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        const { user } = response.data;
        return user;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("上傳失敗");
    }
  }
);

export const updateUser = createAsyncThunk(
  "/user/updataUser",
  async (value, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const { username, headerImg } = value;
    try {
      const response = await serAuthAxios(token).post(updateUserRoute, {
        username,
        headerImg,
      });
      const { success, user } = response.data;
      if (success) {
        return user;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("上傳失敗");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const { username, email, _id, headerImg } = payload.user;
      state.username = username;
      state.email = email;
      state.userId = _id;
      state.headerImg = headerImg;
      state.token = payload.token;
    },
    userLogout: (state) => {
      state.username = "";
      state.email = "";
      state.userId = "";
      state.headerImg = "";
      state.token = "";

      localStorage.clear();
    },
  },
  extraReducers: {
    [uploadHeader.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadHeader.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.headerImg = payload.headerImg;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [uploadHeader.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { headerImg, username } = payload;
      state.username = username;
      state.headerImg = headerImg;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setUserData, userLogout } = userSlice.actions;

export default userSlice.reducer;
