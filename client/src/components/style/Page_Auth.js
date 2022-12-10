import styled from "styled-components";
const Wrapper = styled.div`
  form {
    width: 95%;
    max-width: 30em;
    height: 40em;
    border-radius: 1em;
    backdrop-filter: blur(10px);
    justify-content: flex-start;
    gap: 1em;
    padding: 2.5em;
  }

  .logo_box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-bottom: 1em;
  }
  .logo_box p {
    font-size: 2em;
    font-weight: 500;
  }
  img {
    width: 3em;
    object-fit: cover;
  }

  h1,
  label,
  input,
  p,
  button {
    color: #fff;
  }
  h1 {
    font-size: 2rem;
    /* align-self: flex-start; */
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  div {
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1.7rem;
  }
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 0.7px solid #fff;
    padding: 0.5em;
  }
  input::placeholder {
    color: #fff;
    font-size: 1rem;
  }
  .password {
    flex: 1;
    position: relative;
  }
  .password span {
    color: #fff;
    font-size: 1.7rem;
    position: absolute;
    right: 0.5em;
    top: 2em;
    cursor: pointer;
  }
  .submitBtn {
    background-color: var(--primary-3);
    padding: 0.3em 0.5em;
    width: 100%;
    font-weight: 600;
    border-radius: 0.5em;
    font-size: 1.5rem;
    &:active {
      transform: translate(1px, 1px);
    }
  }
  .member_check div {
    width: 100%;
    gap: 0.5em;

    & button {
      padding: 0;
      border-bottom: 1.3px solid #fff;
    }
  }

  @media screen and (max-width: 450px) {
    form {
      height: 65%;
      max-width: 90%;
    }
  }
`;

export default Wrapper;
