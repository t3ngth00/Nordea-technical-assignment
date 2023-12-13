import { BandMembers } from './models/band-members';

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

function cloneBandData (band: BandMembers): BandMembers {
  return JSON.parse(JSON.stringify(band)) as typeof band;
}

// copy band to expected
const expected: BandMembers = cloneBandData(band);
console.log(expected)
console.assert(band !== expected)