const allNoteNames = ['A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'];
const allIntervals = ['unison', 'min2', 'maj2', 'min3', 'maj3', 'per4', 'tritone', 'per5', 'min6', 'maj6', 'min7', 'maj7', 'octave'];

const intervalActiveState = {
  rootNote: null,
  intervalNote: null,
  currentInterval: null,
  scoreCorrect: 0,
  scoreTotal: 0,
  bestCorrectStreak: 0,
  currentStreak: 0,
  isGameStarted: false,
  isAnswered: false,
  intervalStats: {},
}

function getPercentage(correctNum, totalNum) {
  return Math.round((correctNum / totalNum) * 100);
}

function resetAudioPlayback(rootNote, intervalNote) {;
  if (!rootNote) return;
  rootNote.pause();
  intervalNote.pause();
  rootNote.currentTime = 0;
  intervalNote.currentTime = 0;
  rootNote.volume = 1;
}

function playNotes(noteTiming, rootNote, intervalNote) {
  resetAudioPlayback(rootNote, intervalNote);
  if (!rootNote) return;
  rootNote.play();
  setTimeout(() => {
    rootNote.volume = 0.5;
    intervalNote.play();
  }, noteTiming);
}

let selectedIntervals;

function getNextInterval() {
  const intervalButtons = document.querySelectorAll('.interval-button');
  intervalButtons.forEach((button) => {
    button.disabled = false;
  });

  intervalActiveState.isAnswered = false;
  resetAudioPlayback(intervalActiveState.rootNote, intervalActiveState.intervalNote);

  function getAudioFromIndex(index) {
    const encodedNote = encodeURIComponent(allNoteNames[index]);
    const note = new Audio('audio/' + encodedNote + '.mp3');
    return note;
  }

  function getIntervalNoteIndex() {
    const randomInterval = Math.floor(Math.random() * selectedIntervals.length);
    intervalActiveState.currentInterval = selectedIntervals[randomInterval];
    for (let i = 0; i < allIntervals.length; i++) {
      if (allIntervals[i] === intervalActiveState.currentInterval) {
        return rootNoteIndex + i;
      }
    }
  }

  newIntervalBtn.disabled = true;
  const rootNoteIndex = Math.floor(Math.random() * (allNoteNames.length - 12));
  const intervalNoteIndex = getIntervalNoteIndex();
  intervalActiveState.rootNote = getAudioFromIndex(rootNoteIndex);
  intervalActiveState.intervalNote = getAudioFromIndex(intervalNoteIndex);
}


const startGameBtn = document.getElementById('new-game-btn');
const stopGameBtn = document.getElementById('stop-btn');
const repeatIntervalBtn = document.getElementById('hear-again-btn');
const newIntervalBtn = document.getElementById('hear-new-btn');
const percentDisplay = document.getElementById('percent');

function setGameState() {
  const hearButtons = document.getElementById('hear-buttons');
  const intervalButtonContainer = document.getElementById('interval-buttons');
  const intervalSelectionList = document.querySelectorAll('.interval');
  const statsContainer = document.getElementById('statistics');
  if (!intervalActiveState.isGameStarted) { //Game is not started
    hearButtons.style.display = 'none';
    startGameBtn.disabled = false;
    stopGameBtn.disabled = true;
    intervalButtonContainer.innerHTML = '';
    intervalSelectionList.forEach((item) => {
      item.disabled = false;
    });
    statsContainer.style.display = 'block';
  } else if (intervalActiveState.isGameStarted) { //Game is started
    hearButtons.style.display = '';
    startGameBtn.disabled = true;
    stopGameBtn.disabled = false;
    percentDisplay.innerHTML = '0';
    intervalActiveState.currentStreak = 0;
    intervalActiveState.bestCorrectStreak = 0;
    intervalSelectionList.forEach((item) => {
      item.disabled = true;
    });
    statsContainer.style.display = 'none';
  }
}

setGameState();

startGameBtn.addEventListener('click', () => {
  const scoreCorrectDisplay = document.querySelectorAll('.score-correct');
  const scoreTotalDisplay = document.querySelectorAll('.score-total');
  const intervalSelectionList = document.querySelectorAll('.interval');
  intervalActiveState.isGameStarted = true;
  selectedIntervals = [];
  setGameState();

  intervalSelectionList.forEach((interval) => {
    if (interval.checked) {
      selectedIntervals.push(interval.id);
      intervalActiveState.intervalStats[interval.id] = {correct: 0, total: 0};
    }
  });

  function appendIntervalButtons() {
    function updateStatistics(interval, isCorrect) {
      const bestStreakDisplay = document.getElementById('best-streak');

      function appendScores() {
        scoreCorrectDisplay.forEach((score) => {
          score.innerHTML = intervalActiveState.scoreCorrect;
        });
        scoreTotalDisplay.forEach((score) => {
          score.innerHTML = intervalActiveState.scoreTotal;
        });
      }
      function appendStreak() {
        if (intervalActiveState.currentStreak === intervalActiveState.bestCorrectStreak) {
          intervalActiveState.bestCorrectStreak += 1;
          intervalActiveState.currentStreak += 1;
          bestStreakDisplay.textContent = intervalActiveState.bestCorrectStreak;
        } else if (intervalActiveState.currentStreak < intervalActiveState.bestCorrectStreak) {
          intervalActiveState.currentStreak += 1;
        }
      }
      // function appendItemizedStats() {

      // }
      if (isCorrect) {
        intervalActiveState.intervalStats[interval].correct++;
        intervalActiveState.intervalStats[interval].total++;
        appendScores();
        appendStreak();
      } else {
        intervalActiveState.intervalStats[interval].total++;
        appendScores();
      }
    }
    
    const intervalAnswerContainer = document.getElementById('interval-buttons');
    intervalAnswerContainer.innerHTML = '';
    for (let i = 0; i < selectedIntervals.length; i++) {
      const intervalButton = document.createElement('button');
      intervalButton.className = 'interval-button';
      intervalButton.id = selectedIntervals[i];
      intervalButton.textContent = selectedIntervals[i];
      intervalAnswerContainer.appendChild(intervalButton);

      intervalButton.addEventListener('click', (btn) => {
        if (btn.target.id === intervalActiveState.currentInterval && !intervalActiveState.isAnswered) { //Correct Answer
          newIntervalBtn.disabled = false;
          intervalActiveState.scoreCorrect += 1;
          intervalActiveState.scoreTotal += 1;
          updateStatistics(intervalActiveState.currentInterval, true)
        } else if (btn.target.id !== intervalActiveState.currentInterval && !intervalActiveState.isAnswered) { //First time incorrect
          intervalActiveState.scoreTotal += 1;
          intervalActiveState.currentStreak = 0;
          updateStatistics(intervalActiveState.currentInterval, false);
        } else if (btn.target.id === intervalActiveState.currentInterval) { //Following incorrect
          newIntervalBtn.disabled = false;
        }
        btn.target.disabled = true;
        intervalActiveState.isAnswered = true;
        percentDisplay.innerHTML = getPercentage(intervalActiveState.scoreCorrect, intervalActiveState.scoreTotal);
      })
    }
  }
  
  intervalActiveState.scoreCorrect = 0;
  intervalActiveState.scoreTotal = 0;
  scoreCorrectDisplay.forEach((score) => score.innerHTML = 0);
  scoreTotalDisplay.forEach((score) => score.innerHTML = 0);
  appendIntervalButtons();
  getNextInterval();
  playNotes(750, intervalActiveState.rootNote, intervalActiveState.intervalNote);
});

stopGameBtn.addEventListener('click', () => {
  intervalActiveState.isGameStarted = false;
  setGameState();
});

repeatIntervalBtn.addEventListener('click', () => {
  playNotes(750, intervalActiveState.rootNote, intervalActiveState.intervalNote);
});

newIntervalBtn.addEventListener('click', () => {
  getNextInterval();
  playNotes(750, intervalActiveState.rootNote, intervalActiveState.intervalNote);
});


const statisticsHeader = document.getElementById('statistics-header');

statisticsHeader.addEventListener('click', () => {
  const statisticsContainer = document.getElementById('statistics');
  if (statisticsContainer.style.display === 'none') {
    statisticsContainer.style.display = 'block';
  } else {
    statisticsContainer.style.display = 'none';
  }
});