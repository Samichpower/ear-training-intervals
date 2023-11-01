# ear-training-intervals

GOALS FOR THIS PROJECT:
-Create an ear training page for intervals with only basic features. Get a random interval from the selected options, display buttons of the selected options, then play the sound of the interval. On pressing the button, it will check if it's correct. If yes, end that round. If no, keep the round going.
-Add a 'hands-off' mode, where I can hit start and it will play a random interval, wait a few seconds for me to mentally guess the answer, then give the answer, before doing it again. The goal of this is to allow me to put my phone in my pocket while I work for some passive ear training.


onRoundStart
create array from selected intervals.
function getRandomInterval
Select randomly from an array of all notes for the root note.
Then get a random item from an array of the chosen intervals.
How to correspond the interval choice with the root note? If else statements would work, but I feel like there's an easier way.
if randomArrayInterval = majorThird, return allNotesArray[root + 5]

Actually that could be doable. Simply have a seperate function to handle that for all with parameters for root and chosen interval.
getRandomInterval(rootNote, randomInterval)