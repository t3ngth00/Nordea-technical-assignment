export interface Member {
  name: string;
  age: number;
  plays: string[];
}

export interface BandMembers {
  members: BandMembersDetail
}

export interface BandMembersDetail {
  current: Member[];
  past: Member[];
}

export interface TranformedBandMembersDetail extends BandMembersDetail {
  all: string[]
}

export interface ExpectedBandMembers {
  members: TranformedBandMembersDetail
}

export interface Plays {
  vocals: string[];
  synth: string[];
  guitar: string[];
  bass: string[];
  drums: string[];
}

export interface ExpectedBandMembersDetail extends ExpectedBandMembers {
  plays: Plays
}
