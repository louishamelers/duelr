export interface Playgroup {
  uid?: string;
  name?: string;
  chat?: string;
  players?: string[];
}

export const emptyPlaygroup: Playgroup = {
  name: 'Playgroup',
  chat: '',
  players: []
};

