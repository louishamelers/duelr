export interface Playgroup {
  uid?: string;
  name?: string;
  players?: string[];
}

export const emptyPlaygroup: Playgroup = {
  name: 'Playgroup',
  players: []
};

