import React, { useRef } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SocketApi from "../../api/socket-api";
import { useConnectSocket } from "../../hooks/useConnectSocket";
import styles from "./Chat.module.css";
import MessageForm from "../MessageForm/MessageForm";
import FilePreview from "../FilePreview/FilePreview";
import ParseComponent from "../ParseComponent/ParseComponent";
import { Pagination } from "@mui/material";
import { formatDate } from "../../services/formatData";
import Sort from "../Sort/Sort";

const Chat: React.FC = () => {
  const { messages, error, page, handleChangePage, totalMessages } =
    useConnectSocket();
  console.log(error);
  console.log(messages);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteComment = (commentId: number) => {
    SocketApi.socket?.emit("server-delete-comment", { commentId, page });
  };

  const totalPages = Math.ceil(totalMessages / 25) || 1;
  return (
    <div className={styles.chatContainer}>
      <Sort page={page} />
      <Pagination count={totalPages} page={page} onChange={handleChangePage} />

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
