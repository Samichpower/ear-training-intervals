# ear-training-intervals

GOALS FOR THIS PROJECT:
-Create an ear training page for intervals with only basic features. Get a random interval from the selected options, display buttons of the selected options, then play the sound of the interval. On pressing the button, it will check if it's correct. If yes, end that round. If no, keep the round going.

-Add a 'hands-off' mode, where I can hit start and it will play a random interval, wait a few seconds for me to mentally guess the answer, then give the answer, before doing it again. The goal of this is to allow me to put my phone in my pocket while I work for some passive ear training.


BUGS
-Breaks with no intervals selected




NOTES ON HANDS FREE
On start game click, if hands free mode is checked
Function doHandsFree
Function containing a single round of the game, repeating after the specified interval time. 

else if hands free mode is unchecked
function doGame, normal game.


THIS IS WHAT THE setInterval DOES:
Get interval
Play interval
Wait 1-2 seconds
Play audio of the answer
Repeat specified amount