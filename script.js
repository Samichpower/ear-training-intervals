const allNoteNames = ['A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'];
const allIntervals = ['unison', 'min2', 'maj2', 'min3', 'maj3', 'per4', 'tritone', 'per5', 'min6', 'maj6', 'min7', 'maj7', 'octave'];

const newGameBtn = document.getElementById('new-game-btn');
const nextIntervalBtn = document.getElementById('hear-new-btn');
nextIntervalBtn.addEventListener('click', getNewInterval);

function getNewInterval() {
  const randomNoteIndex = Math.floor(Math.random() * allNoteNames.length);
  function createIntervalObjectList() {
    const activeNoteIntervals = []
    for (i = 0; i < allIntervals.length; i++) {
      activeNoteIntervals.push({
        interval: allIntervals[i],
        note: allNoteNames[randomNoteIndex + i]
      })
    }
    return activeNoteIntervals;
  }

  function getGameIntervals() {
    const currentRoundIntervals = createIntervalObjectList();
    const specifiedIntervals = [];
    specifiedIntervals.push(currentRoundIntervals[4], currentRoundIntervals[7], currentRoundIntervals[12]);
    return specifiedIntervals;
  }

  const roundIntervalChoices = getGameIntervals();
  const roundInterval = roundIntervalChoices[Math.floor(Math.random() * roundIntervalChoices.length)];

  //This is probably where I'd put the setTimeout or whatever to add sound and stuff
  console.log(allNoteNames[randomNoteIndex]);
  console.log(roundInterval);
}

const allIntervalSelections = document.querySelectorAll('.interval');

let specifiedIntervals;

newGameBtn.addEventListener('click', () => {
  selectedIntervals = [];
  allIntervalSelections.forEach((interval) => {
    if (interval.checked) {
      selectedIntervals.push(interval.id);
    }
  })
  console.log(selectedIntervals)
})