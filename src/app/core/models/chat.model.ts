export enum Type {
  SINGLE,
  GROUP
}

export interface Message {
  uid?: string;
  content?: string;
  createdAt?: number;
}

export interface Chat {
  id?: string;
  type?: Type;
  info?: string;
  createdAt?: number;
  chatName?: string;
  members?: [];
  messages?: Message[];
}

export const emptyChat: Chat = {
  createdAt: Date.now(),
  type: Type.GROUP,
  info: '',
  chatName: '',
  members: [],
  messages: [],
};
