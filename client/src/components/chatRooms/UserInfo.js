import React, { useRef, useState } from "react";
import Wrapper from "../style/UserInfo";
import { FaUserAlt } from "react-icons/fa";
import {
  AiOutlineSetting,
  AiOutlineCheckCircle,
  AiFillCamera,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { uploadHeader, updateUser } from "../../features/userSlice";

const UserInfo = ({ headerImg, username, token, host }) => {
  const { isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    username: username,
    headerImg: headerImg,
  });
  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    if (isLoading) return;
    e.preventDefault();
    const { username } = updateData;
    if (!username || !token) return;
    dispatch(updateUser({ ...updateData, token }));
    setUpdate(false);
  };

  const uploadImg = (e) => {
    if (isLoading) return;
    dispatch(uploadHeader({ img: e.target.files[0] }));
  };
  return (
    <Wrapper className="userInfo">
      <div className="header">
        {headerImg ? (
          <img src={`${host}/uploads/${headerImg}`} alt="headerimg" />
        ) : (
          <span className="icon_heade flex-row">
            <FaUserAlt />
          </span>
        )}
      </div>

      {/* 相片上傳鍵 */}
      {update && (
        <div
          className="img_btn flex-row"
          onClick={() => imgRef.current.click()}
        >
          <input type="file" ref={imgRef} onChange={uploadImg} />
          <span className="flex-row">
            <AiFillCamera />
          </span>
        </div>
      )}

      {/*姓名更改  */}
      {update ? (
        <input
          type="text"
          name="username"
          value={updateData.username}
          onChange={(e) =>
            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
          }
        />
      ) : (
        <p>{username}</p>
      )}
      {/* 上船鍵 */}
      {!update ? (
        <button
          type="button"
          onClick={() => setUpdate(true)}
          className="flex-row"
        >
          <AiOutlineSetting />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading}
          className="submit_btn flex-row"
          onClick={handleSubmit}
        >
          <AiOutlineCheckCircle />
        </button>
      )}
    </Wrapper>
  );
};

export default UserInfo;
