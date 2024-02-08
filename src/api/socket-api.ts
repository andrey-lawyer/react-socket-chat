import { Socket, io } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;
  // static createConnection() {
  //   this.socket = io(import.meta.env.VITE_BACKEND_URL);
  //   this.socket.on("connect", () => {
  //     console.log("connect server");
  //   });
  //   this.socket.on("disconnect", () => {
  //     console.log("disconnect server");
  //   });
  // }
  static createConnectionWithToken(authToken: string) {
    this.socket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: { token: authToken },
    });

    this.socket.on("connect", () => {
      console.log("connect server with token");
    });

    this.socket.on("disconnect", () => {
      console.log("disconnect server with token");
    });
  }
}

export default SocketApi;
