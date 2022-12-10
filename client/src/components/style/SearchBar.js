import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  padding: 1em;
  background-color: var(--grey-300);

  .msg {
    width: 100%;
    font-size: 1.4rem;
  }
  .search-bar_input {
    width: 100%;
    position: relative;
    margin-bottom: 1em;

    input {
      width: 100%;
      padding: 0.4em;
      font-size: 1.4rem;
      outline: none;
      border: none;
      background-color: transparent;
      border-bottom: 1.2px solid var(--grey-50);
      color: var(--grey-50);
      &::placeholder {
        font-size: 1.4rem;
        color: var(--grey-50);
      }
    }

    span {
      font-size: 2em;
      background-color: transparent;
      position: absolute;
      top: 53%;
      right: 0.5em;
      transform: translateY(-50%);
      color: var(--grey-50);
    }
  }

  .result_room {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.7em;
    border-bottom: 0.7px solid var(--grey-50);
    padding-bottom: 0.5em;
    color: var(--grey-50);
    .room_code {
      flex: 1;
    }
    .join_btn {
      background-color: var(--primary-4);
      color: var(--grey-100);
      font-weight: 700;
      font-size: 1.3rem;
      padding: 0.3em 0.7em;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        transform: translate(1px, 1px);
      }
    }

    .headerImg {
      width: 4.5em;
      height: 4.5em;
      border-radius: 50%;
      border: 0.7px solid var(--grey-50);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        width: 100%;
        height: 100%;
        font-size: 1.7rem;
      }
    }
  }
`;
export default Wrapper;
