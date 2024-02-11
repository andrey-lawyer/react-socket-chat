import React, { useRef } from "react";
import Zoom from "react-medium-image-zoom";
import { Pagination } from "@mui/material";

import { FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "react-medium-image-zoom/dist/styles.css";

import SocketApi from "../../api/socket-api";
import { formatDate } from "../../services/formatData";
import { useConnectSocket } from "../../hooks/useConnectSocket";

import MessageForm from "../MessageForm/MessageForm";
import FilePreview from "../FilePreview/FilePreview";
import ParseComponent from "../ParseComponent/ParseComponent";
import Sort from "../Sort/Sort";

import styles from "./Chat.module.css";
import { toast } from "react-toastify";

const Chat: React.FC = () => {
  const { messages, page, handleChangePage, totalMessages, loading, error } =
    useConnectSocket();
  if (error) toast.error(error);
  //
  console.log(messages);
  //

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteComment = (commentId: number) => {
    SocketApi.socket?.emit("server-delete-comment", { commentId, page });
  };

  const totalPages = Math.ceil(totalMessages / 25) || 1;
  return (
    <div className={styles.chatContainer}>
      {loading && <div className={styles.loader} />}
      <Sort page={page} />
      <Pagination
        className={styles.pagination}
        count={totalPages}
        page={page}
        onChange={handleChangePage}
      />

      <ul className={styles.message_list}>
        {messages.map((el) => (
          <li key={el.id} className={styles.message_item}>
            <div className={styles.block_user}>
              <img
                className={styles.image}
                src={`data:image/svg+xml,${encodeURIComponent(
                  el.member.avatar
                )}`}
                alt={`avatar of ${el.member.name}`}
                width={20}
                height={20}
              />
              <p>{el.member.name}</p>
              <p>{el.member.email}</p>
              <p className={styles.date}>{formatDate(el.createdAt)}</p>
            </div>
            <div className={styles.block_message}>
              <ParseComponent htmlContent={el.text} className={styles.text} />
              {el.file && (
                <>
                  {el.fileType === "text" ? (
                    <a
                      className="link"
                      href={el.file}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                    >
                      <FaFileDownload size="40px" />
                    </a>
                  ) : (
                    <Zoom>
                      <img
                        className={styles.picture}
                        src={el.file}
                        alt="image of member"
                        width="1000"
                      />
                    </Zoom>
                  )}
                </>
              )}
            </div>

            {el.comments && el.comments.length > 0 && (
              <ul>
                {el.comments.map((comment, ind) => (
                  <li
                    key={comment.id}
                    className={styles.commentItem}
                    style={{
                      marginLeft: ind < 10 ? `${(ind + 1) * 15}px` : "165px",
                    }}
                  >
                    <div className={styles.block_user}>
                      <img
                        className={styles.image}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          comment.member.avatar
                        )}`}
                        alt={`avatar of ${el.member.name}`}
                        width={20}
                        height={20}
                      />
                      <p>{comment.member.name}</p>
                      <p>{comment.member.email}</p>
                      <p className={styles.date}>
                        {formatDate(comment.createdAt)}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                        className={styles.button}
                      >
                        <MdDelete />
                      </button>
                    </div>
                    <div className={styles.block_message}>
                      <ParseComponent
                        htmlContent={comment.text}
                        className={styles.text}
                      />
                      {comment.file && (
                        <>
                          {comment.fileType === "text" ? (
                            <FilePreview fileUrl={comment.file} />
                          ) : (
                            <Zoom>
                              <img
                                className={styles.picture}
                                src={comment.file}
                                alt="image of member"
                                width="1000"
                              />
                            </Zoom>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <MessageForm type="comment" id={el.id} page={page} />
          </li>
        ))}
      </ul>

      {totalPages === page && (
        <>
          <h2 className={styles.title}>New chat</h2>
          <MessageForm type="chat" page={page} />
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
