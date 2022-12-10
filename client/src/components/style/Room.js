import styled from "styled-components";

const Wrapper = styled.div`
  .room_container {
    width: 100%;
    height: 6em;
    min-height: 6em;
    justify-content: flex-start;
    gap: 0.7em;
    padding: 1em;
    cursor: pointer;
  }
  .room_container.active {
    border: 0.8px solid var(--primary-2);
    box-shadow: 0px 0px 7px var(--primary-2);
  }

  .headerImg {
    width: 4.5em;
    height: 4.5em;
    border-radius: 50%;
    box-shadow: 0px 0px 3px var(--primary-2);
    border: 0.5px solid var(--primary-2);
    color: var(--primary-2);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      width: 100%;
      height: 100%;
      font-size: 1.8rem;
    }
  }
  .delete_btn {
    padding-top: 1em;
    height: 100%;
    font-size: 1.3rem;
    color: var(--grey-50);
    cursor: pointer;
  }
  .room_name {
    flex: 1;
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    word-break: break-all;
    color: var(--grey-50);

    .room_code {
      width: 100%;
      word-break: break-all;
    }
    .other_name {
      font-size: 1.3rem;
      color: var(--grey-300);
      font-weight: 600;
      overflow: hidden;
    }
  }
`;

export default Wrapper;
