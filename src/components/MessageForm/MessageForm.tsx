import { useState } from "react";
import SocketApi from "../../api/socket-api";
import { FaCommentDots } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./MessageForm.module.css";

interface IFormMessage {
  type: string;
  page: number;
  id?: number;
}

const MessageForm = ({ type, page, id }: IFormMessage) => {
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitMessage = (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;

    const elements = form.elements;
    const text = elements.text.value;
    const file = elements.file.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const dataFile = reader.result;

        SocketApi.socket?.emit("server-message", {
          file: dataFile,
          page,
          text,
        });
      };

      reader.readAsDataURL(file);
    } else {
      SocketApi.socket?.emit("server-message", { text, page });
    }

    form.reset();
  };

  const handleSubmitComment = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    messageId: number
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements;
    const commentText = elements.text.value;
    const commentFile = elements.file.files[0];
    if (commentFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const dataFile = reader.result;

        SocketApi.socket?.emit("server-add-comment", {
          file: dataFile,
          text: commentText,
          messageId,
          page,
        });
      };

      reader.readAsDataURL(commentFile);
    } else {
      SocketApi.socket?.emit("server-add-comment", {
        text: commentText,
        messageId,
        page,
      });
    }

    form.reset();
  };

  const handleTagClick = (tag: string) => {
    setMessage((prevMessage) => prevMessage + tag);
  };

  return (
    <form
      onSubmit={
        type === "comment"
          ? (e) => handleSubmitComment(e, id!)
          : handleSubmitMessage
      }
      className={`${styles.form} ${
        type === "comment" ? styles.form_comment : styles.form_chat
      }`}
    >
      {type === "comment" && <FaCommentDots className={styles.icon} />}
      <div className={styles.tags}>
        <button
          type="button"
          className={`${styles.button_i} ${styles.button}`}
          onClick={() => handleTagClick("<i></i>")}
        >
          [i]
        </button>
        <button
          type="button"
          className={`${styles.button_strong} ${styles.button}`}
          onClick={() => handleTagClick(" <strong></strong>")}
        >
          [strong]
        </button>
        <button
          type="button"
          className={`${styles.button_code} ${styles.button}`}
          onClick={() => handleTagClick("<code></code>")}
        >
          [code]
        </button>
        <button
          type="button"
          className={`${styles.button_a} ${styles.button}`}
          onClick={() => handleTagClick('<a href=""></a>')}
        >
          [a]
        </button>
      </div>
      <textarea
        name="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.text}
      />
      <div className={styles.block}>
        <input type="file" name="file" />
        <button type="submit" className={styles.button}>
          <BsFillSendFill />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
