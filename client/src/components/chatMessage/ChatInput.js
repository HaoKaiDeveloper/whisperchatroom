import React, { useRef, useState } from "react";
import Wrapper from "../style/ChatInput";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import IsLoading from "../IsLoading";

const ChatInput = ({ handleSendMessage, handleSendImg, sendFile }) => {
  const [message, setMessage] = useState("");
  const fileRef = useRef(null);

  const uploadImg = (e) => {
    if (sendFile) return;

    handleSendImg(e.target.files[0]);
  };

  const handelKeyUp = (e) => {
    e.preventDefault();
    if (e.code === "Enter" && message.length > 0) {
      sendChat(e);
    }
  };

  const handelChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const sendChat = (e) => {
    if (sendFile) return;
    e.preventDefault();

    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Wrapper className="chat-input" onSubmit={sendChat}>
      <div className="file">
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileRef}
          onChange={uploadImg}
        />
        <span onClick={() => fileRef.current.click()}>
          <HiPhotograph />
        </span>
      </div>
      <div className="text">
        <input
          type="text"
          value={message}
          onChange={handelChange}
          onKeyUp={handelKeyUp}
        />
      </div>
      <button type="submit" onClick={sendChat} className="flex-row ">
        {sendFile ? <IsLoading xs={"xs"} /> : <AiOutlineSend />}
      </button>
    </Wrapper>
  );
};

export default ChatInput;
