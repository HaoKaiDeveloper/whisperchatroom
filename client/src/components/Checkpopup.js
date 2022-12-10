import React from "react";
import styled from "styled-components";
import IsLoading from "./IsLoading";

const Checkpopup = ({ title, activeFunction, info, togglePopup, loading }) => {
  return (
    <Wrapper>
      <div className="popup_box">
        <p className="title">{title}</p>
        {loading ? (
          <IsLoading />
        ) : (
          <div className="btns">
            <button onClick={() => activeFunction(info)}>確認</button>
            <button onClick={() => togglePopup()}>取消</button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Checkpopup;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .popup_box {
    width: 19em;
    height: 10em;
    background-color: rgba(225, 225, 225, 0.4);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    border-radius: 1em;

    .title {
      font-size: 1.5em;
      letter-spacing: 1.5px;
      color: var(--grey-50);
      font-weight: 600;
    }

    .btns {
      display: flex;
      align-items: center;
      gap: 1.5em;
    }
    button {
      padding: 0.3em 0.7em;
      border-radius: 0.5em;
      background-color: var(--primary-3);
      color: #fff;
      cursor: pointer;
      letter-spacing: 1px;

      &:hover {
        font-weight: 600;
      }
      &:active {
        transform: translate(1px, 1px);
      }
    }
  }
`;
