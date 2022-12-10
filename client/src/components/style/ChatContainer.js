import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 89%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1.5em 1em;
  overflow-y: scroll;
  position: relative;

  @media screen and (max-width: 700px) {
    padding: 4em 1em 1.5em 1em;
  }
  .leaveMsg {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    text-align: center;
    font-size: 1.3rem;
  }

  .msg_file,
  .msg_text,
  .msg_video {
    max-width: 20em;
    height: 100%;
    padding: 0.3em 0.5em;
    letter-spacing: 1px;
    background-color: var(--primary-2);
    border-radius: 7px;
    box-shadow: var(--shadow-1);
  }

  .msg_text {
    word-break: break-all;
    color: var(--grey-50);
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
  }
  .msg_file {
    width: 20em;
    height: 25em;
    padding: 1.5em 1em;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .msg_video {
    width: 20em;
    height: 12em;
    padding: 1em 1em;
    video {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }

  .msg {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
  }

  .msg_box {
    position: relative;
  }
  .time {
    position: absolute;
    right: -3.5em;
    bottom: 0.1em;
    color: var(--grey-200);
    white-space: nowrap;
    letter-spacing: 0.5px;
  }

  .selfMsg {
    justify-content: flex-end;
  }
  .selfMsg .time {
    left: -3.5em;
  }

  .text_block {
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.7rem;
    position: relative;

    .text {
      margin-left: 2rem;
    }

    .name {
      position: absolute;
      top: 0.2em;
      left: 3.2em;
      font-size: 1.3rem;
      font-weight: 400;
      color: var(--grey-50);
      max-width: 20em;
      overflow: hidden;
      white-space: nowrap;
    }

    .chatHeader {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
export default Wrapper;
