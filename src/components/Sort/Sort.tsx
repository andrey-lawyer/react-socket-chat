import { Button } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import SocketApi from "../../api/socket-api";
import { ISortProps } from "../../types/props.types";

import styles from "./Sort.module.css";

function Sort({ page }: ISortProps) {
  const handleSort = (field: string, type: string) => {
    const data = {
      page,
      sortBy: field,
      sortOrder: type,
    };
    SocketApi.socket?.emit("server-sort", data);
  };
  return (
    <div className={styles.sort}>
      <div className={styles.block}>
        <Button
          size="small"
          onClick={() => handleSort("name", "DESC")}
          variant="outlined"
          endIcon={<ArrowCircleUpIcon />}
        >
          Name
        </Button>
        <Button
          size="small"
          onClick={() => handleSort("name", "ASC")}
          variant="contained"
          endIcon={<ArrowCircleDownIcon />}
        >
          Name
        </Button>
      </div>
      <div className={styles.block}>
        <Button
          size="small"
          onClick={() => handleSort("email", "DESC")}
          variant="outlined"
          endIcon={<ArrowCircleUpIcon />}
        >
          Email
        </Button>
        <Button
          size="small"
          onClick={() => handleSort("email", "ASC")}
          variant="contained"
          endIcon={<ArrowCircleDownIcon />}
        >
          Email
        </Button>
      </div>
      <div className={styles.block}>
        <Button
          size="small"
          onClick={() => handleSort("createdAt", "DESC")}
          variant="outlined"
          endIcon={<ArrowCircleUpIcon />}
        >
          Date
        </Button>
        <Button
          size="small"
          onClick={() => handleSort("createdAt", "ASC")}
          variant="contained"
          endIcon={<ArrowCircleDownIcon />}
        >
          Date
        </Button>
      </div>
    </div>
  );
}

export default Sort;
