import React, { useEffect, useState } from "react";
import Wrapper from "../style/RoomsContainer";
import Room from "./Room";
import setAuthAxios from "../../utils/useAuthFetch";
import { getAllRoomsRoute, checkRoomExistedRoute } from "../../utils/APIRoutes";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyRooms,
  setActiveRoom,
  deteleOneRoom,
  deleteSingleRoom,
  updateRoomInfo,
  setOtherUser,
} from "../../features/chatRoomSlice";
import Checkpopup from "../Checkpopup";

const RoomsContainer = ({
  token,
  socket,
  userId,
  leaveMsg,
  leaveRoomId,
  setLeave,
}) => {
  const { myRooms, activeRoom } = useSelector((store) => store.chatRoom);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({
    show: false,
    info: "",
  });

  const getAllRooms = async () => {
    try {
      const res = await setAuthAxios(token).get(getAllRoomsRoute);
      dispatch(getMyRooms(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const joinTheRoom = async (roomId) => {
    try {
      socket.emit("join_room", roomId);
      const response = await setAuthAxios(token).post(checkRoomExistedRoute, {
        roomId,
      });
      if (response.status === 200) {
        const { room, otherUser } = response.data;
        dispatch(setActiveRoom(roomId));
        dispatch(updateRoomInfo(room));
        dispatch(setOtherUser(otherUser));
      }
    } catch (err) {
      console.log(err);
      if (!err.response.data.exist) {
        dispatch(deteleOneRoom(roomId));
      }
    }
  };

  const deleteRoom = async (roomId) => {
    setIsLoading(true);
    try {
      dispatch(deleteSingleRoom(roomId));
      socket.emit("leave_room", { roomId: roomId });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    dispatch(setActiveRoom(null));
    setShowPopup({
      show: false,
      info: "",
    });
  };

  function togglePopup(info) {
    if (info) {
      setShowPopup({
        show: true,
        info: info,
      });
    } else {
      setShowPopup({
        show: false,
        info: "",
      });
    }
  }

  useEffect(() => {
    if (leaveMsg.length > 0) {
      setTimeout(() => {
        dispatch(setActiveRoom(null));
        dispatch(deteleOneRoom(leaveRoomId));
        setLeave();
      }, 3000);
    }
  }, [leaveMsg]);

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <Wrapper className="rooms_container scroll-box">
      {myRooms.map((room) => {
        return (
          <Room
            {...room}
            key={room._id}
            joinTheRoom={joinTheRoom}
            userId={userId}
            deleteRoom={togglePopup}
            activeRoom={activeRoom}
          />
        );
      })}
      {showPopup.show && (
        <Checkpopup
          title="確認刪除房間"
          loading={isLoading}
          info={showPopup.info}
          togglePopup={togglePopup}
          activeFunction={deleteRoom}
        />
      )}
    </Wrapper>
  );
};

export default RoomsContainer;
