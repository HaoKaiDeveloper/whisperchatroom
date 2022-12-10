import React, { useState, useEffect } from "react";
import Wrapper from "../style/CreateRoomForm";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import IsLoading from "../IsLoading";
import setAuthAxios from "../../utils/useAuthFetch";
import { createRoomRoute } from "../../utils/APIRoutes";
import { useDispatch } from "react-redux";
import { addRoom } from "../../features/chatRoomSlice";

const CreateRoomForm = ({ setCreateRoomForm }) => {
  const dispatch = useDispatch();
  const { email, userId, token } = useSelector((store) => store.user);
  const [createData, setCreateData] = useState({
    createBy: userId,
    users: [userId],
    roomCode: "",
    headerImg: "",
  });
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState("");
  const [createError, setCreateError] = useState("");
  const mailName = email.slice(0, email.indexOf("@"));

  const createRoom = async (data) => {
    setIsOpening(true);
    try {
      const res = await setAuthAxios(token).post(createRoomRoute, data);
      dispatch(addRoom(res.data));
      setResult("已經開啟聊天室");
    } catch (err) {
      setResult("開啟失敗，請稍後再試");
    }
    setIsOpening(false);
  };

  const checkResult = () => {
    setCreateRoomForm(false);
    setResult("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createData.roomCode.length < 5) {
      setCreateError("至少為五位數");
      return;
    } else if (createData.roomCode.length > 8) {
      setCreateError("超過位數上限");
      return;
    }
    const roomData = {
      ...createData,
      roomCode: mailName + createData.roomCode,
    };
    createRoom(roomData);
  };

  useEffect(() => {
    if (createError) {
      setTimeout(() => {
        setCreateError("");
      }, 1500);
    }
  }, [createError]);

  return (
    <Wrapper>
      {!result ? (
        <form className="create_form flex-column" onSubmit={handleSubmit}>
          <h1>開啟聊天室</h1>

          <span className="close_btn" onClick={() => setCreateRoomForm(false)}>
            <AiOutlineClose />
          </span>

          <div className="create_input">
            <label htmlFor="roomCode">設定聊天室代號 :</label>
            <div>
              <p>{mailName}</p>
              <input
                type="text"
                id="roomCode"
                name="roomCode"
                value={createData.roomCode}
                placeholder="5~8位英文及數字"
                onChange={(e) =>
                  setCreateData({ ...createData, roomCode: e.target.value })
                }
              />
            </div>
          </div>
          <p className="createError">{createError}</p>
          {isOpening ? <IsLoading /> : <button type="submit">確認開啟</button>}
        </form>
      ) : (
        <div className="create_result flex-column">
          <h1>{result}</h1>
          <p className="result_code">
            聊天室代號 : <span>{mailName + createData.roomCode}</span>
          </p>
          <button type="button" onClick={checkResult}>
            確認
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default CreateRoomForm;
