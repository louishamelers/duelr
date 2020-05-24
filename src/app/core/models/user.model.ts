export interface User {
  uid?: string;
  email?: string;
  chats?: string[];
  playerName?: string;
  playgroups?: string[];
  notifications?: string[];
}

export const emptyUser: User = {
  playerName: null,
  playgroups: [],
  notifications: [],
  chats: []
};
