import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  min-height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.7rem;
  background-color: var(--grey-400);

  .btn {
    width: 1.4em;
    height: 1.4em;
    border-radius: 50%;
    padding: 0.2em;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--grey-50);
    transition: all 0.2s;
    &:hover {
      transform: scale(1.3);
      background-color: var(--grey-300);
      border: 1px solid var(--primary-2);
    }
  }
`;

export default Wrapper;
