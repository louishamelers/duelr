export interface Message {
  uid?: string;
  content?: string;
  createdAt?: number;
}

export interface Chat {
  id?: string;
  createdAt?: number;
  chatName?: string;
  memberColors?: {id: string, color: string}[];
  messages?: Message[];
}

export const emptyChat: Chat = {
  createdAt: Date.now(),
  chatName: '',
  memberColors: [],
  messages: [],
};
