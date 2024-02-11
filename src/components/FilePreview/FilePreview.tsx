import { useState } from "react";
import { toast } from "react-toastify";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";

import Modal from "../Modal/Modal";

import styles from "./FilePreview.module.css";
import { IFilePreviewProps } from "../../types/props.types";

function FilePreview({ fileUrl }: IFilePreviewProps) {
  const [fileContent, setFileContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadFileContent = async () => {
    try {
      const response = await fetch(fileUrl);
      const content = await response.text();
      setFileContent(content);
      openModal();
    } catch (error) {
      toast.error("Failed to load file content");
    }
  };

  return (
    <div className={styles.link_block}>
      <a
        href={fileUrl}
        rel="noopener noreferrer nofollow"
        target="_blank"
        title="Previewing a file"
      >
        <FaFileDownload size="40px" />
      </a>
      <button
        className={styles.link_button}
        type="button"
        onClick={loadFileContent}
      >
        <MdOutlinePreview />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {fileContent && <div>{fileContent}</div>}
      </Modal>
    </div>
  );
}

export default FilePreview;
