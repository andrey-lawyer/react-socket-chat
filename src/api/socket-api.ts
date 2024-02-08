import { Socket, io } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;

  static createConnectionWithToken(authToken: string) {
    const BACKEND_URL =
      import.meta.env.VITE_BACKEND_URL || "https://nest-sockets.onrender.com/";

    this.socket = io(BACKEND_URL, {
      auth: { token: authToken },
    });

    this.socket.on("connect", () => {
      console.log("connect server with token...");
    });

    this.socket.on("disconnect", () => {
      console.log("disconnect server with token");
    });
  }
}

export default SocketApi;
