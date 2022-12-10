import React from "react";
import styled from "styled-components";

const IsLoading = ({ xs }) => {
  return (
    <Wrapper>
      <div className={`loading ${xs}`}></div>
    </Wrapper>
  );
};

export default IsLoading;

const Wrapper = styled.div`
  .loading {
    width: 3em;
    height: 3em;
    border: 2px solid var(--grey-100);
    border-left: 2px solid var(--primary-2);
    border-radius: 50%;
    animation: isLoading 0.5s ease infinite;
  }

  .loading.xs {
    width: 1em;
    height: 1em;
  }
  @keyframes isLoading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
