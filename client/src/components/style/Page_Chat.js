import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2em;
  .container {
    width: 95%;
    max-width: 70em;
    height: 60em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-shadow: 0px 25px 45px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(7px);
  }

  .chat-rooms {
    width: 23em;
    height: 100%;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;
    background-color: transparent;
    z-index: 5;

    .rooms_container {
      flex: 1;
    }
  }

  .chat {
    flex: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
    .sidebar_Btn {
      width: 2.5em;
      height: 2.5em;
      position: absolute;
      right: 1em;
      top: 2em;
      z-index: 3;
      display: none;

      .bar {
        width: 2.5em;
        height: 2px;
        background-color: var(--grey-50);
        position: relative;
        transition: all 0.3s;
        &::before,
        &::after {
          content: "";
          width: 2.5em;
          height: 2px;
          background-color: var(--grey-50);
          position: absolute;
        }
        &::before {
          top: 1em;
        }
        &::after {
          top: -1em;
        }
      }

      .bar.active {
        transform: rotate(45deg);
        &::before {
          top: 0;
          transform: rotate(90deg);
        }
        &::after {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .chat-rooms {
      position: fixed;
      left: -100%;
      top: 0;
      background-color: var(--grey-500);
      transition: all 0.3s;
    }
    .chat-rooms.active {
      left: 0em;
    }

    .chat {
      .sidebar_Btn {
        display: block;
      }
    }
  }
  @media screen and (max-width: 450px) {
    .container {
      width: 100vw;
      height: 70vh;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);

      .chat-rooms {
        width: 80vw;
      }
      .chat {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
export default Wrapper;
