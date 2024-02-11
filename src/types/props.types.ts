import { ReactNode } from "react";

export interface IFilePreviewProps {
  fileUrl: string;
}

export interface IFormMessage {
  type: string;
  page: number;
  id?: number;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface IParseProps {
  htmlContent: string;
  className: string;
}

export interface ISortProps {
  page: number;
}