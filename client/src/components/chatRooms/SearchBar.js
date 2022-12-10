import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "../style/SearchBar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { searchRoomRoute, joinTheRoomRoue, host } from "../../utils/APIRoutes";
import setAuthAxios from "../../utils/useAuthFetch";
import { setActiveRoom, addRoom } from "../../features/chatRoomSlice";

const SearchBar = ({ token, socket, userId }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState("");
  const [join, setJoin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    if (isLoading || !searchInput) return;
    e.preventDefault();

    const url = `${searchRoomRoute}?roomName=${searchInput}`;
    setIsLoading(true);
    try {
      const res = await setAuthAxios(token).get(url);
      if (res.status === 200 && res.data.result.length > 0) {
        const { roomCode, users, _id, createBy } = res.data.result[0];
        const headerImg = users[0].headerImg;
        setResult({
          roomCode,
          users,
          _id,
          headerImg,
        });

        if (createBy === userId || users.length > 1) {
          setJoin(false);
        } else {
          setJoin(true);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setResult({ _id: "" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput.length < 1) {
      setResult("");
    }
  }, [searchInput]);

  const joinTheRoom = async (roomId) => {
    const url = joinTheRoomRoue + roomId;
    try {
      const res = await setAuthAxios(token).get(url);
      const { room, join } = res.data;
      if (join && room) {
        socket.emit("join_room", roomId);
        dispatch(addRoom(room));
        dispatch(setActiveRoom(room._id));
        setSearchInput("");
        setResult("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper className="search-bar">
      <form className="search-bar_input flex-row" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="搜尋聊天室"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <span onClick={handleSearch}>
          <AiOutlineSearch />
        </span>
      </form>

      {result && (
        <div className="result_room">
          <div className="headerImg">
            {result.headerImg ? (
              <img src={`${host}/uploads/${result.headerImg}`} alt="header" />
            ) : (
              <span className="flex-row">
                <FaUserAlt />
              </span>
            )}
          </div>

          <p className="room_code">{result.roomCode}</p>
          {join && (
            <p className="join_btn" onClick={() => joinTheRoom(result._id)}>
              加入
            </p>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default SearchBar;
