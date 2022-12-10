import axios from "axios";

const setAuthAxios = (token) => {
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return authAxios;
};

export default setAuthAxios;
