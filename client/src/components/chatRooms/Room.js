import React, { useState, useEffect } from "react";
import Wrapper from "../style/Room";
import { FaUserAlt } from "react-icons/fa";
import { host } from "../../utils/APIRoutes";

const Room = ({
  users,
  roomCode,
  _id,
  joinTheRoom,
  userId,
  deleteRoom,
  activeRoom,
}) => {
  const other = users.filter((user) => user._id !== userId)[0];
  const [activeClass, setActiveClass] = useState("room_container");
  let username;
  let roomImg;

  if (other) {
    username = other.username;
    roomImg = other.headerImg;
  }

  useEffect(() => {
    if (activeRoom && activeRoom._id === _id) {
      setActiveClass("room_container flex-row active");
    } else {
      setActiveClass("room_container flex-row");
    }
  }, [activeRoom]);

  return (
    <Wrapper>
      <div className={activeClass} onClick={() => joinTheRoom(_id)}>
        <div className="headerImg">
          {roomImg ? (
            <img src={`${host}/uploads/${roomImg}`} alt="img" />
          ) : (
            <span className="flex-row">
              <FaUserAlt />
            </span>
          )}
        </div>

        <div className="room_name">
          <p className="room_code">{roomCode}</p>
          <p className="other_name">with {username}</p>
        </div>
        <span className="delete_btn" onClick={() => deleteRoom(_id)}>
          刪除
        </span>
      </div>
    </Wrapper>
  );
};

export default Room;
