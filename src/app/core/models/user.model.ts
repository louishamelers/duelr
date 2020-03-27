export interface User {
  uid?: string;
  email?: string;
  playerName?: string;
  playgroups?: string[];
}

export const emptyUser: User = {
  playerName: null,
  playgroups: []
};
