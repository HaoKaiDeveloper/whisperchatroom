import { Auth, Chat, ProtectRoute } from "./pages";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import back from "./components/assets/background3.jpg";
import styled from "styled-components";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <ProtectRoute>
              <Chat />
            </ProtectRoute>
          }
        ></Route>

        <Route path="/auth" index element={<Auth />} />
      </Routes>
      <Wrapper>
        <img src={back} alt="back" />
      </Wrapper>
    </HashRouter>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: back 1s ease forwards;
  }
  @keyframes back {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`;
