import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import setAuthAxios from "../utils/useAuthFetch";
import Wrapper from "../components/style/Page_Chat";
import {
  sendMessageRoute,
  getMessageRoute,
  sendFileRoute,
  host,
} from "../utils/APIRoutes";

import {
  SearchBar,
  TouchBtns,
  RoomsContainer,
  UserInfo,
} from "../components/chatRooms/index";
import { ChatInput, ChatContainer } from "../components/chatMessage/index";
import io from "socket.io-client";

const socket = io.connect(host);

const Chat = () => {
  const { activeRoom, otherUser } = useSelector((store) => store.chatRoom);
  const { token, userId, headerImg, username } = useSelector(
    (store) => store.user
  );
  const [allMessage, setAllMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [leaveMsg, setLeaveMsg] = useState("");
  const [leaveRoomId, setLeaveRoomId] = useState("");
  const [sendFile, setSendFild] = useState(false);

  const handleSendMessage = async (msg) => {
    const now = new Date();
    socket.emit("send_message", {
      roomId: activeRoom,
      sender: userId,
      msg,
      type: "text",
      createdAt: now,
    });
    await setAuthAxios(token).post(sendMessageRoute, {
      from: userId,
      to: activeRoom,
      message: msg,
      type: "text",
    });
    const msgs = [...allMessage];
    msgs.push({
      roomId: activeRoom._id,
      message: msg,
      createdAt: now,
      sender: userId,
      type: "text",
    });
    setAllMessage(msgs);
  };

  const handleSendImg = async (file) => {
    if (file.size > 10000000) return;
    const formData = new FormData();
    formData.append("file", file);
    setSendFild(true);
    try {
      const res = await setAuthAxios(token).post(
        `${sendFileRoute}/${activeRoom._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const now = new Date();
        const { url } = res.data;
        const tempUrl = url.slice(8);
        console.log(url);
        const sendFileMsg = {
          roomId: activeRoom,
          sender: userId,
          msg: `/uploads/${tempUrl}`,
          type: file.type,
          createdAt: now,
        };
        socket.emit("send_message", sendFileMsg);

        const msgs = [...allMessage];
        msgs.push({
          roomId: activeRoom._id,
          message: sendFileMsg.msg,
          createdAt: now,
          sender: userId,
          type: file.type,
        });
        setAllMessage(msgs);
      }
      setSendFild(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessage = async () => {
    try {
      const res = await setAuthAxios(token).post(getMessageRoute, {
        roomId: activeRoom,
      });
      setAllMessage(res.data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  function setLeave() {
    setLeaveMsg("");
    setLeaveRoomId("");
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      const { sender, msg, type, createdAt, roomId } = data;
      const newMsg = {
        message: msg,
        sender: sender,
        type,
        createdAt,
        roomId: roomId._id,
      };
      setArrivalMessage(newMsg);
    });
    socket.on("leave_roomMsg", (data) => {
      const { msg, roomId } = data;
      setLeaveMsg(msg);
      setLeaveRoomId(roomId);
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage != null && arrivalMessage.roomId === activeRoom._id) {
      setAllMessage([...allMessage, arrivalMessage]);
    }
    setArrivalMessage(null);
  }, [arrivalMessage]);

  useEffect(() => {
    getMessage();
    setShowSidebar(false);
  }, [activeRoom]);
  document.title = "Whisper | Chat";

  return (
    <Wrapper>
      <div className="container opcityBackground fixed-center">
        {/* 聊天室欄位、功能按鈕 */}
        <div
          className={
            showSidebar
              ? "chat-rooms flex-column active"
              : "chat-rooms flex-column"
          }
        >
          {/* 使用者資訊 */}
          <UserInfo
            headerImg={headerImg}
            username={username}
            token={token}
            host={host}
          />

          {/* 搜尋聊天室 */}
          <SearchBar token={token} socket={socket} userId={userId} />

          {/* rooms-container */}
          <RoomsContainer
            token={token}
            socket={socket}
            userId={userId}
            leaveMsg={leaveMsg}
            leaveRoomId={leaveRoomId}
            setLeave={setLeave}
          />

          {/* 刪除、開啟聊天室鍵 */}
          <TouchBtns socket={socket} />
        </div>

        {/* 聊天欄位 */}
        <div className="chat">
          <div
            className="sidebar_Btn flex-row"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <div className={showSidebar ? "bar active" : "bar"}></div>
          </div>

          {/* 聊天內容 */}
          <ChatContainer
            allMessage={allMessage}
            activeRoom={activeRoom}
            userId={userId}
            otherUser={otherUser}
            leaveMsg={leaveMsg}
            sendFile={sendFile}
          />
          {/* 資料設定 */}
          {activeRoom && (
            <ChatInput
              handleSendMessage={handleSendMessage}
              handleSendImg={handleSendImg}
              sendFile={sendFile}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
