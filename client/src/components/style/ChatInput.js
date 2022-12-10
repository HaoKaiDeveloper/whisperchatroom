import styled from "styled-components";

const Wrapper = styled.form`
  width: 100%;
  height: 11%;
  border-top: 1px solid rgba(225, 225, 225, 0.8);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  position: relative;

  input[type="file"] {
    display: none;
  }

  button {
    padding: 0.5em 0.7em;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    border-radius: 5px;
    color: var(--primary-1);
    box-shadow: var(--shadow-1);
    background-color: var(--primary-2);
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      background-color: transparent;
      color: var(--primary-1);
      box-shadow: var(--shadow-2);
      transform: translate(2px, 2px);
    }
  }

  .file {
    span {
      font-size: 3rem;
      color: #eceff1;
      margin: 0 0.2em;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }

  .text {
    flex: 1;
    width: 100%;
    height: 70%;
    input {
      width: 100%;
      height: 100%;
      resize: none;
      padding: 0.5em 0.8em;
      font-size: 1.7rem;
      outline: none;
      border-radius: 5px;
    }
  }
`;

export default Wrapper;
