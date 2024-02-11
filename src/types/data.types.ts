export interface IData {
  messages: IMessages[];
  totalMessages: number;
}

export interface IMessages {
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
