export interface Member {
  name: string;
  age: number;
  plays: string[];
}

export interface BandMembers {
  members: {
    current: Member[];
    past: Member[];
  }
}