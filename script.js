const allNoteNames = ['A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'];
const allIntervals = ['unison', 'min2', 'maj2', 'min3', 'maj3', 'per4', 'tritone', 'per5', 'min6', 'maj6', 'min7', 'maj7', 'octave'];


let rootNoteIndex;
let intervalNoteIndex;
let rootNote;
let intervalNote;

function resetAudioPlayback() {
  if (!rootNote) return;
  rootNote.pause();
  intervalNote.pause();
  rootNote.currentTime = 0;
  intervalNote.currentTime = 0;
  rootNote.volume = 1;
}

function playNotes(noteTiming) {
  resetAudioPlayback();
  if (!rootNote) return;
  rootNote.play();
  setTimeout(() => {
    rootNote.volume = 0.5;
    intervalNote.play();
  }, noteTiming);
}

let selectedIntervals;
let interval;
let isAnswered;

function getNextInterval() {
  const intervalButtons = document.querySelectorAll('.interval-button');
  intervalButtons.forEach((button) => {
    button.disabled = false;
  });

  isAnswered = false;
  resetAudioPlayback();

  function getAudioFromIndex(index) {
    const encodedNote = encodeURIComponent(allNoteNames[index]);
    const note = new Audio('audio/' + encodedNote + '.mp3');
    return note;
  }

  function getIntervalNoteIndex() {
    const randomInterval = Math.floor(Math.random() * selectedIntervals.length);
    interval = selectedIntervals[randomInterval];
    for (let i = 0; i < allIntervals.length; i++) {
      if (allIntervals[i] === interval) {
        return rootNoteIndex + i;
      }
    }
  }

  newIntervalBtn.disabled = true;
  rootNoteIndex = Math.floor(Math.random() * (allNoteNames.length - 12));
  rootNote = getAudioFromIndex(rootNoteIndex);
  intervalNoteIndex = getIntervalNoteIndex();
  intervalNote = getAudioFromIndex(intervalNoteIndex);
}

const newGameBtn = document.getElementById('new-game-btn');
const repeatIntervalBtn = document.getElementById('hear-again-btn');
const newIntervalBtn = document.getElementById('hear-new-btn');
let scoreCorrect;
let scoreTotal;

function getPercentage() {
  const percentDisplay = document.getElementById('percent');
  percentDisplay.innerHTML = '';
  let percent = Math.round((scoreCorrect / scoreTotal) * 100);
  percentDisplay.innerHTML = percent;
}

newGameBtn.addEventListener('click', () => {
  const intervalChoices = document.querySelectorAll('.interval');
  selectedIntervals = [];
  intervalChoices.forEach((interval) => {
    if (interval.checked) {
      selectedIntervals.push(interval.id);
    }
  })

  const scoreCorrectDisplay = document.getElementById('score-correct');
  const scoreTotalDisplay = document.getElementById('score-total');

  function appendIntervalButtons() {
    const buttonContainer = document.getElementById('interval-buttons');
    buttonContainer.innerHTML = '';
    for (let i = 0; i < selectedIntervals.length; i++) {
      const intervalButton = document.createElement('button');
      intervalButton.className = 'interval-button';
      intervalButton.id = selectedIntervals[i];
      intervalButton.textContent = selectedIntervals[i];
      buttonContainer.appendChild(intervalButton);

      intervalButton.addEventListener('click', (e) => {
        if (e.target.id === interval && !isAnswered) {
          newIntervalBtn.disabled = false;
          scoreCorrectDisplay.innerHTML = ++scoreCorrect;
          scoreTotalDisplay.innerHTML = ++scoreTotal;
        } else if (e.target.id !== interval && !isAnswered) {
          scoreTotalDisplay.innerHTML = ++scoreTotal;
        } else if (e.target.id === interval) {
          newIntervalBtn.disabled = false;
        }
        e.target.disabled = true;
        isAnswered = true;
        getPercentage();
      })
    }
  }
  
  scoreCorrect = 0;
  scoreTotal = 0;
  scoreCorrectDisplay.innerHTML = 0;
  scoreTotalDisplay.innerHTML = 0;
  appendIntervalButtons();
  getNextInterval();
  playNotes(750);
})

repeatIntervalBtn.addEventListener('click', () => {
  playNotes(750);
})

newIntervalBtn.addEventListener('click', () => {
  getNextInterval();
  playNotes(750);
});