import { useEffect, useState } from "react";
import SocketApi from "../api/socket-api";

import { IData, IMessages } from "../types/data.types";

export const useConnectSocket = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event.target);
    setPage(value);
    SocketApi.socket?.emit("server-pagination", value);
  };

  const connectSocket = async () => {
    const authToken = localStorage.getItem("token-member");

    SocketApi.createConnectionWithToken(authToken || "");

    SocketApi.socket?.on("auth-error", (authErrorMessage: string) => {
      setError(authErrorMessage);
    });

    SocketApi.socket?.emit("auth", authToken);

    SocketApi.socket?.on("client-message", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
      setLoading(false);
      setError("");
    });

    SocketApi.socket?.on("client-add-comment", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
      setError("");
    });

    SocketApi.socket?.on("client-delete-comment", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
      setError("");
    });

    SocketApi.socket?.on("client-pagination", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
      setError("");
    });

    SocketApi.socket?.on("client-sort", (data: IData) => {
      setMessages(data.messages);
      setTotalMessages(data.totalMessages);
      setError("");
    });

    SocketApi.socket?.on("error", (errorMessage: string) => {
      setError(errorMessage);
    });
  };

  useEffect(() => {
    setLoading(true);
    connectSocket();
  }, []);

  return { messages, error, page, handleChangePage, totalMessages, loading };
};
