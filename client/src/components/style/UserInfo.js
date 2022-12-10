import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  position: relative;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.4);
  p,
  input {
    flex: 1;
    color: var(--grey-50);
    font-size: 1.7rem;
  }
  input {
    max-width: 8em;
    outline: none;
    background-color: transparent;
    padding-bottom: 0.3em;
    border-bottom: 0.7px solid var(--grey-50);
  }

  .img_btn {
    span {
      width: 5rem;
      height: 5rem;
      background-color: transparent;
      font-size: 1.8rem;
      position: absolute;
      left: 3rem;
      bottom: -0.3rem;
      color: var(--grey-50);
      cursor: pointer;
    }
  }
  input[type="file"] {
    display: none;
  }
  button {
    width: 2.5em;
    height: 2.5em;
    font-size: 2.5em;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s;
    color: var(--grey-100);
    &:hover {
      transform: rotate(180deg) scale(1.5);
      color: var(--grey-100);
    }
    &:active {
      transform: rotate(0) scale(1);
    }
  }

  .submit_btn {
    &:hover {
      transform: rotate(0) scale(1.5);
    }
    &:active {
      transform: rotate(0) scale(1);
    }
  }

  .header {
    width: 4.5rem;
    height: 4.5rem;
    min-height: 4.5rem;
    min-width: 4.5rem;
    border-radius: 50%;
    border: 0.5px solid #fff;
    overflow: hidden;
    position: relative;
    box-sizing: content-box;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .icon_heade {
      width: 100%;
      height: 100%;
      font-size: 1.6rem;
      background-color: #fff;
    }
  }
`;

export default Wrapper;
