import { BandMembers, ExpectedBandMembers, TranformedBandMembersDetail } from './models/band-members';

// Data
const band: BandMembers = {
  members: {
    current: [
      { name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass'] },
      { name: 'Lucia', age: 49, plays: ['vocals', 'synth'] },
      { name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth'] },
      { name: 'Steve', age: 55, plays: ['guitar'] }
    ],
    past: [
      { name: 'Raymond', age: 57, plays: ['vocals', 'synth'] },
      { name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth'] },
      { name: 'Gunter', age: 57, plays: ['guitar', 'synth'] }
    ]
  }
};

function cloneBandData(band: BandMembers): BandMembers {
  return JSON.parse(JSON.stringify(band)) as typeof band;
}

// clone band member, so that we don't modify the original object data
const bandMemberClone: BandMembers = cloneBandData(band);
console.assert(band !== bandMemberClone)
console.assert(bandMemberClone.members.current[0].name === 'Sascha')

//5.1
function addPropAllToExpected(bandMembers: BandMembers = bandMemberClone): ExpectedBandMembers {
  return {
    members: {
      ...bandMembers.members,
      ...{
        all: [
          ...bandMembers.members.current.map(currentMember => currentMember.name),
          ...bandMembers.members.past.map(pastMember => pastMember.name)]
      }
    }
  }
};

const bandMembersWithAllProp: ExpectedBandMembers = addPropAllToExpected();
console.assert(bandMembersWithAllProp.members.all.length === (band.members.current.length + band.members.past.length));