// let btnRef = document.querySelectorAll(".button-option");
// let popupRef = document.querySelector(".popup");
// let newgameBtn = document.getElementById("new-game");
// let restartBtn = document.getElementById("restart");
// let msgRef = document.getElementById("message");
// //Winning Pattern Array
// let winningPattern = [
//   [0, 1, 2],
//   [0, 3, 6],
//   [2, 5, 8],
//   [6, 7, 8],
//   [3, 4, 5],
//   [1, 4, 7],
//   [0, 4, 8],
//   [2, 4, 6],
// ];
// //Player 'X' plays first
// let xTurn = true;
// let count = 0;

// //Disable All Buttons
// const disableButtons = () => {
//   btnRef.forEach((element) => (element.disabled = true));
//   //enable popup
//   popupRef.classList.remove("hide");
// };

// //Enable all buttons (For New Game and Restart)
// const enableButtons = () => {
//   btnRef.forEach((element) => {
//     element.innerText = "";
//     element.disabled = false;
//   });
//   //disable popup
//   popupRef.classList.add("hide");
// };

// //This function is executed when a player wins
// const winFunction = (letter) => {
//   disableButtons();
//   if (letter == "X") {
//     msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
//   } else {
//     msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
//   }
// };

// //Function for draw
// const drawFunction = () => {
//   disableButtons();
//   msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
// };

// //New Game
// newgameBtn.addEventListener("click", () => {
//   count = 0;
//   enableButtons();
// });
// restartBtn.addEventListener("click", () => {
//   count = 0;
//   enableButtons();
// });

// //Win Logic
// const winChecker = () => {
//   //Loop through all win patterns
//   for (let i of winningPattern) {
//     let [element1, element2, element3] = [
//       btnRef[i[0]].innerText,
//       btnRef[i[1]].innerText,
//       btnRef[i[2]].innerText,
//     ];
//     //Check if elements are filled
//     //If 3 empty elements are same and would give win as would
//     if (element1 != "" && (element2 != "") & (element3 != "")) {
//       if (element1 == element2 && element2 == element3) {
//         //If all 3 buttons have same values then pass the value to winFunction
//         winFunction(element1);
//       }
//     }
//   }
// };

// //Display X/O on click
// btnRef.forEach((element) => {
//   element.addEventListener("click", () => {
//     if (xTurn) {
//       xTurn = false;
//       //Display X
//       element.innerText = "X";
//       element.disabled = true;
//     } else {
//       xTurn = true;
//       //Display Y
//       element.innerText = "O";
//       element.disabled = true;
//     }
//     //Increment count on each click
//     count += 1;
//     if (count == 9) {
//       drawFunction();
//     }
//     //Check for win on every click
//     winChecker();
//   });
// });
// //Enable Buttons and disable popup on page load
// window.onload = enableButtons;








var origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}