export const host = "http://localhost:5000";
// export const host = "https://chatroomserver12.herokuapp.com";

export const regiesterRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const uploadHeaderRoute = `${host}/api/auth/uploadHeader`;
export const updateUserRoute = `${host}/api/auth/updateUser`;
// Room
export const createRoomRoute = `${host}/api/room/createRoom`;
export const searchRoomRoute = `${host}/api/room/searchRoom/`;
export const getAllRoomsRoute = `${host}/api/room/getAllRooms`;
export const joinTheRoomRoue = `${host}/api/room/firstJoinTheRoom/`;
export const deleteSingleRoomRoute = `${host}/api/room/deleteSingelRoom/`;
export const deleteAllRoomRoute = `${host}/api/room/deleteAllRoom`;
export const checkRoomExistedRoute = `${host}/api/room/checkRoomExisted`;

// Message
export const sendMessageRoute = `${host}/api/message/sendMessage`;
export const getMessageRoute = `${host}/api/message/getMessage`;
export const sendFileRoute = `${host}/api/message/sendFile`;
