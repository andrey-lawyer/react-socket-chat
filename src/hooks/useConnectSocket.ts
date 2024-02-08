import { useEffect, useState } from "react";
import SocketApi from "../api/socket-api";

interface IData {
  messages: IMessages[];
  totalMessages: number;
}

interface IMessages {
  text: string;
  id: number;
  file?: string;
  fileType?: string;
  createdAt: string;

  member: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    homePage?: string;
  };
  comments?: IMessages[];
  messageId?: number;
}

export const useConnectSocket = () => {
  const [page, setPage] = useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event.target);
    setPage(value);
    SocketApi.socket?.emit("server-pagination", value);
  };
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const connectSocket = () => {
    const authToken = localStorage.getItem("token-member");

    SocketApi.createConnectionWithToken(authToken || "");

    SocketApi.socket?.on("auth-error", (authErrorMessage: string) => {
      setError(authErrorMessage);
    });

    SocketApi.socket?.emit("auth", authToken);

    SocketApi.socket?.on("client-message", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
    });

    SocketApi.socket?.on("client-add-comment", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
    });

    SocketApi.socket?.on("client-delete-comment", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
    });

    SocketApi.socket?.on("client-pagination", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
    });

    SocketApi.socket?.on("client-sort", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
    });

    SocketApi.socket?.on("error", (errorMessage: string) => {
      setError(errorMessage);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { messages, error, page, handleChangePage, totalMessages };
};
