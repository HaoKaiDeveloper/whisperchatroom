import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { regiesterRoute, loginRoute } from "../utils/APIRoutes";
import { setUserData } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/style/Page_Auth";
import FormInput from "../components/authPage/formInput";
import logo from "../components/assets/logo.png";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isMember, setIsmember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const handleMember = () => {
    setIsmember(!isMember);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let username;
    if (!isMember) {
      username = userNameRef.current.value;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password || password.length < 6) {
      return setMsg("資料請填寫齊全");
    }
    if ((!isMember && !username) || password.length < 6) {
      return setMsg("資料請填寫齊全");
    }
    if (!isMember && username) {
      return authFetch({ username, email, password }, regiesterRoute);
    }
    authFetch({ email, password }, loginRoute);
  };

  const authFetch = async (value, url) => {
    try {
      const res = await axios.post(url, value);
      const { token, user } = res.data;
      dispatch(setUserData({ token, user }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 1500);
    }
  }, [msg]);
  document.title = "Whisper | Home";

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit}
        className="fixed-center opcityBackground flex-column "
      >
        <div className="logo_box">
          <img src={logo} alt="logo" />
          <p>Whisper</p>
        </div>

        {!isMember && (
          <FormInput
            name="userName"
            labelName="名稱"
            refValue={userNameRef}
            type="text"
          />
        )}

        <FormInput
          name="email"
          labelName="Email"
          refValue={emailRef}
          type="email"
        />

        <div className="password">
          <FormInput
            labelName="密碼"
            name="password"
            type={showPassword ? "text" : "password"}
            refValue={passwordRef}
            placeholder="6位以上英文及數字"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {" "}
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>

        {msg && <p className="errorMsg">{msg}</p>}

        <button type="submit" className="submitBtn">
          {isMember ? "登入" : "註冊"}
        </button>

        <div className="member_check ">
          {isMember ? (
            <div className="flex-row ">
              <p>還不是會員?</p>
              <button type="button" onClick={handleMember}>
                註冊{" "}
              </button>
            </div>
          ) : (
            <div className="flex-row ">
              <p>已經是會員?</p>
              <button type="button" onClick={handleMember}>
                登入{" "}
              </button>
            </div>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default Auth;
