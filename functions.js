var normalMoves = [
  "L", // 0 0
  "R", // 1 1
  "U", // 2 2
  "D", // 3 3
  "B", // 4 4
  "F"  // 5 5
];

var primeMoves = [
  "L'", // 0 6
  "R'", // 1 7
  "U'", // 2 8
  "D'", // 3 9
  "B'", // 4 10
  "F'"  // 5 11
];

var doubleMoves = [
  "L2", // 0 12
  "R2", // 1 13
  "U2", // 2 14
  "D2", // 3 15
  "B2", // 4 16
  "F2"  // 5 17
];

var allMoves = normalMoves.concat(primeMoves, doubleMoves);

/* Functions list
    randomInteger(min, max) - generates a random number between 2 values.
    genIllegalMoves(currentMove) - returns illegal moves as an array.
    isLegal(previousMove, currentMove) - returns boolean true/false.
    genShuffle(length) - generates a shuffle of length x.
*/

function randomInteger(min, max) {
  return Math.floor(Math.random()* (max - min)) + min;
}

function genIllegalMoves(currentMove) {

    var globalIndex = allMoves.indexOf(currentMove);
    var localIndex = 0;

    if (currentMove.split("")[1] === "'") {
      localIndex = globalIndex - 6;
    } else if (currentMove.split("")[1] === "2") {
      localIndex = globalIndex - 12;
    } else {
      localIndex = globalIndex;
    }

    var illegalMoves = [];

    illegalMoves.push(normalMoves[localIndex]);
    illegalMoves.push(primeMoves[localIndex]);
    illegalMoves.push(doubleMoves[localIndex]);

    return illegalMoves;
}

function isLegal(previousMove, currentMove) {
  illegalMoves = genIllegalMoves(previousMove);
  if (illegalMoves.indexOf(currentMove) === -1) {
    return true;
  } else {
    return false;
  }
}

// Last step, what the user should call.
function genShuffle(length) {
  var shuffle = [];
  var previousMove = "";
  for(var i = 1; i <= length; i++) {
    while(true) {
      var currentMove = allMoves[randomInteger(0,17)];
      if (previousMove === "") {
        shuffle.push(currentMove);
        previousMove = currentMove;
        break;
      } else if (isLegal(previousMove,currentMove)) {
        shuffle.push(currentMove);
        previousMove = currentMove;
        break;
      }
    }
  }
  return shuffle;
}

function newShuffle(length) {
  over9000();
  length += 1;
  var shuffleArray = genShuffle(length);
  var shuffleText = "";
  for (i = 1; i < shuffleArray.length; i++) {
    shuffleText += (shuffleArray[i] + " ");
  }
  var shuffleElement = document.getElementById("shuffle");

  shuffleElement.innerHTML = shuffleText;

}

var totalPresses = 0;
function over9000() {
  totalPresses += 1;
  if (totalPresses > 9000) {
    document.getElementById("description").innerHTML = "Over 9000!";
    document.getElementById("description").style.fontWeight = "500";
    document.getElementById("description").style.fontSize = "4rem";
  }
}


// If you read below this line you have ruined the surprise (and santa will not like you).

function dontLook() {
  function isChristmas() {
    var dateAsArray = ("" + new Date()).split(" ");

    if (dateAsArray[1] === "Dec" && dateAsArray[2] === "25") {
      return true;
    } else {
      return false;
    }
  }

  if(isChristmas()) {
    var shuffleText = "It's Christmas... Stop cubing!!";

    var shuffleElement = document.getElementById("shuffle");
    shuffleElement.innerHTML = shuffleText;
    shuffleElement.style.color = "#FF001F";
  }
}


// Why? Be nice.
