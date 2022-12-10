import React, { useState } from "react";
import Wrapper from "../style/TouchBtns";
import CreateRoomForm from "./CreateRoomForm";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../features/userSlice";
import { resetRooms, deleteAllRoom } from "../../features/chatRoomSlice";
import Checkpopup from "../Checkpopup";
import { useDispatch, useSelector } from "react-redux";
import { TbUrgent } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const TouchBtns = ({ socket }) => {
  const { myRooms } = useSelector((store) => store.chatRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createRoomForm, setCreateRoomForm] = useState(false);
  const [showPopup, setShowPopup] = useState({
    show: false,
    info: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handelLogout() {
    dispatch(userLogout());
    dispatch(resetRooms());
    navigate("/");
  }
  async function deleteAll() {
    setIsLoading(true);
    myRooms.forEach((room) => {
      socket.emit("leave_room", { roomId: room._id });
    });
    await dispatch(deleteAllRoom());
    setIsLoading(false);
    setShowPopup({
      show: false,
      info: "",
    });
  }

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

  return (
    <Wrapper className="btn_container">
      {/* 登出 */}
      <span className="btn" title="登出" onClick={handelLogout}>
        <BiLogOut />
      </span>

      {/* 刪除所有聊天室 */}
      <span
        className="deleteRooms_btn btn"
        title="刪除所有聊天室"
        onClick={() => togglePopup(true)}
      >
        <TbUrgent />
      </span>

      {/* 開啟聊天室BTN */}
      <span
        className="createRoom_btn btn"
        onClick={() => setCreateRoomForm(true)}
        title="新增聊天室"
      >
        <AiOutlinePlus />
      </span>
      {showPopup.show && (
        <Checkpopup
          title="刪除所有聊天室"
          togglePopup={togglePopup}
          activeFunction={deleteAll}
          loading={isLoading}
        />
      )}
      {createRoomForm && (
        <CreateRoomForm setCreateRoomForm={setCreateRoomForm} />
      )}
    </Wrapper>
  );
};

export default TouchBtns;
