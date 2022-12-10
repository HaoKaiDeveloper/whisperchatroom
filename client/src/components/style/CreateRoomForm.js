import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .create_form,
  .create_result {
    max-width: 40em;
    width: 95%;
    min-width: 20em;
    height: 20em;
    border-radius: 1.5em;
    border-top: 7px solid var(--primary-3);
    background-color: #fff;
    position: relative;
    overflow: hidden;
    padding: 1em 0.5em;
    justify-content: space-between;

    h1 {
      font-size: 2rem;
      color: var(--primary-3);
      margin-bottom: 0.5em;
    }
    .createError {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .result_code {
      text-align: center;
      width: 80%;
      font-size: 1.5rem;
      color: var(--primary-3);
      letter-spacing: 0.1rem;
      font-weight: 600;
      word-break: break-all;
    }

    button {
      font-size: 1.3rem;
      background-color: var(--primary-3);
      color: #fff;
      border: none;
      padding: 0.7rem;
      border-radius: 8px;
      letter-spacing: 1px;
      cursor: pointer;

      &:hover {
        font-weight: 600;
      }
    }

    .close_btn {
      font-size: 2em;
      color: var(--primary-300);
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      cursor: pointer;
    }
    .create_input {
      flex: 1;
      label {
        font-size: 1.5rem;
        color: var(--grey-300);
        font-weight: 600;
      }
      div {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.7rem;
        margin-top: 1em;

        p,
        input {
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
          color: var(--grey-300);
          font-weight: 500;
        }
        input {
          flex: 1;
          outline: none;
          border: none;
          border-bottom: 0.7px solid black;
        }
      }
    }
  }

  @media screen and (max-width: 350px) {
    .create_form,
    .create_result {
      height: 18em;
      border-radius: 1.5em;
      h1 {
        font-size: 1.8rem;
      }
      .createError {
        display: none;
      }
      .result_code {
        font-size: 1.3rem;
      }

      .close_btn {
        font-size: 1.5em;
      }
      .create_input {
        label {
          font-size: 1.4rem;
        }
        div {
          flex-wrap: wrap;

          p,
          input {
            font-size: 1.3rem;
          }
        }
      }
    }
  }

  @keyframes emptyInput {
    0% {
      transform: translateX(-1rem);
    }
    50% {
      transform: translateX(1rem);
    }
    100% {
      transform: translateX(0rem);
    }
  }
`;

export default Wrapper;
