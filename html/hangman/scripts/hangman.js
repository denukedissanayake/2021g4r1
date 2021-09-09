const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');
var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");

// List of words
const wordList = [
  'apple',
  'banana',
  'school',
  'windy',
  'coin',
  'throw',
  'silence',
  'waterfall',
  'Country',
  'climb',
  'carrot',
  'river',
  'happy',
  'window',
  'pineapple',
  'parrot',
  'elephant',
  'present',
  'america',
  'square',

  'cricket' , 'kitchen' , 'beautiful' , 'lemonade','coffee','broccoli'

];

const wordList2 = [
  'a fruit',
  'a fruit',
  'learning',
  'weather',
  'money',
  'a verb',
  'silence',
  'nature',
  'can see in a map',
  'a verb',
  'a vegetable',
  'nature',
  'feeling',
  'can see in a house',
  'a fruit',
  'a bird',
  'a animal',
  'about time',
  'a country',
  'a geometric figure',

  'a game' , 'cook here' , 'pretty' , 'a drink','a drink','a vegetable'

];

// Word that is selected to play
let selectedWord = null;
// Stores the count of no.of incorrectly typed letters
let incorrectCount = 0;
// Correct letters typed by the player
const correctLetters = [];
// Incorrect letters typed by the player
const incorrectLetters = [];
let hints =null;
let  idx;



// Select a word randomly from wordList and initialize in the DOM
function initializeWord() {
   idx = Math.floor(Math.random() * wordList.length);
   selectedWord = wordList[idx]; 
   const noOfLetters = selectedWord.length;
  
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
  
}


getHint.onclick = function() {
   
    showClue.innerHTML = "Clue: - " +  wordList2 [idx];
};

// Displays an indication sliding from the bottom
function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 2400);
}

// Update the figure when incorrect letters typed
function updateFigure() {
  try {
    bodyParts[incorrectCount].style.display = 'block';
    incorrectCount++;
  } catch (error) {}
}

// When player wins
function successState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = 'Congratulations! You won.';
  }, 400);
}

// When player looses
function failureState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = `Oops! You lost. The right word is "${selectedWord}"`;
  }, 400);
}

// Check if typed key is part of the selected word and update in the DOM if required
function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;

  // Handle keyboard events
  if (
    !backdrop.classList.contains('visible') &&
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (incorrectLetters.includes(character)) {
        displayIndication();
      } else {
        incorrectLetters.push(character);
        if (!incorrect.classList.contains('visible')) {
          incorrect.classList.add('visible');
        }
        incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
        updateFigure();
      }
    }
  }

  // Create a word from all letter items
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  // Check if created word is correct
  if (formedWord === selectedWord) {
    successState();
  }

  // Check if man was hung
  if (incorrectCount >= 6) {
    failureState();
  }
}

// Reset all variables and start a new game
function startNewGame() {
  selectedWord = null;
  incorrectCount = 0;
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  incorrect.classList.remove('visible');
  backdrop.classList.remove('visible');
  finalMsg.classList.remove('visible');
  initializeWord();
}

// Start the game
initializeWord();

// Event Listeners
window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);
