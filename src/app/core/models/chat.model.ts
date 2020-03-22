export interface Message {
  uid?: string;
  content?: string;
  createdAt?: number;
}

export interface Chat {
  id?: string;
  createdAt?: number;
  count?: number;
  messages?: Message[];
}
