import { Socket, io } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;

  static createConnectionWithToken(authToken: string) {
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

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
