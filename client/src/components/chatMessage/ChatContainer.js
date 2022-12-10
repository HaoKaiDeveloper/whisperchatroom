import React, { useEffect, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import { host } from "../../utils/APIRoutes";
import Wrapper from "../style/ChatContainer";

const ChatContainer = ({ allMessage, userId, otherUser, leaveMsg }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [allMessage]);

  return (
    <Wrapper className="chat-container scroll-box">
      {allMessage &&
        allMessage.map((msg, index) => {
          const chatHeader = otherUser.headerImg ? otherUser.headerImg : "";
          const otherUserName = otherUser.username;
          const msgSide = msg.sender === userId ? "msg selfMsg" : "msg";
          return (
            <div key={index} className={msgSide}>
              {msg.sender === userId ? (
                <DisplayMsg type={msg.type} msg={msg} side={msgSide} />
              ) : (
                <div className="text_block">
                  <div className="chatHeader">
                    {chatHeader.length > 0 ? (
                      <img
                        src={`${host}/uploads/${chatHeader}`}
                        alt="chatHeader"
                      />
                    ) : (
                      <span>
                        <FaUserAlt />
                      </span>
                    )}
                  </div>

                  <p className="name">{otherUserName}</p>
                  <DisplayMsg type={msg.type} msg={msg} side={msgSide} />
                </div>
              )}
            </div>
          );
        })}
      <div ref={scrollRef}></div>
      <p className="leaveMsg">{leaveMsg.length > 0 && leaveMsg}</p>
    </Wrapper>
  );
};

export default ChatContainer;

const DisplayMsg = ({ type, msg, sendFile }) => {
  const hours = new Date(msg.createdAt).getHours();
  let minuntes = new Date(msg.createdAt).getMinutes();
  if (minuntes < 10) {
    minuntes = `0${minuntes}`;
  }
  const time = `${hours}:${minuntes}`;
  if (type === "text") {
    return (
      <div className="msg_box">
        <p className="msg_text opcityBackground flex-row"> {msg.message}</p>
        <p className="time">{time}</p>
      </div>
    );
  } else if (type.slice(0, 5) === "image") {
    return (
      <div className="msg_box">
        <div className="msg_file opcityBackground flex-row">
          <img src={`${host}${msg.message}`} alt="msg_file" />;
        </div>
        <p className="time">{time}</p>
      </div>
    );
  } else {
    return (
      <div className="msg_box">
        <div className="msg_video opcityBackground flex-row">
          <video controls>
            <source src={`${host}${msg.message}`} type={type} />
          </video>
        </div>
        <p className="time">{time}</p>
      </div>
    );
  }
};
