import { BASE_WS } from "config/constants";
import { io } from "socket.io-client";

export const socket = io(BASE_WS, {
    withCredentials: true,
    autoConnect: false,
});
