import { io } from "socket.io-client";
export const socketClient = io(process.env.REACT_APP_SOCKET_SERVER_URL!);
