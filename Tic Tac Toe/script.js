let turn = "X";
let cells = document.querySelectorAll(".cell");


function placeMark(cell) {
	if (!cell.textContent) {
		cell.textContent = turn;
		if (checkWin()) {
			alert(turn + " wins!");
			reset();
		} else if (checkDraw()) {
			alert("It's a draw!");
			reset();
		} else {
			turn = turn === "X" ? "O" : "X";
		}
	}
}

function checkWin() {
	return (
		checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8) ||
		checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8) ||
		checkRow(0, 4, 8) || checkRow(2, 4, 6)
	);
}

function checkRow(a, b, c) {
	return (
		cells[a].textContent &&
		cells[a].textContent === cells[b].textContent &&
		cells[b].textContent === cells[c].textContent
	);
}

function checkDraw() {
	return Array.from(cells).every(cell => cell.textContent);
}

function reset() {
	cells.forEach(cell => cell.textContent = "");
	turn = "X";
}


function resetBoard() {
  // Get all the cell elements
  const cells = document.querySelectorAll('.cell');

  // Reset the value of each cell to an empty string
  cells.forEach(cell => cell.innerHTML = '');
}
// Define audio elements
const xAudio = new Audio('synth-bass-drop-impact-14706.mp3');
const oAudio = new Audio('ting.mp3');
const winAudio = new Audio('bass-dropmp3-14596.mp3');

function placeMark(cell) {
	if (!cell.textContent) {
		cell.textContent = turn;
		if (checkWin()) {
			// Play win sound
			winAudio.play();

			alert(turn + " wins!");
			reset();
		} else if (checkDraw()) {
			alert("It's a draw!");
			reset();
		} else {
			// Play X or O sound depending on the player's turn
			if (turn === "X") {
				xAudio.play();
			} else {
				oAudio.play();
			}

			// Switch turns
			turn = turn === "X" ? "O" : "X";
		}
	}
}

function reset() {
	cells.forEach(cell => {
		cell.textContent = "";
		cell.classList.remove("winner");
	});

	// Play reset sound
	resetAudio.play();

	turn = "X";
}
function resetBoard() {
  // Get all the cell elements
  const cells = document.querySelectorAll('.cell');

  // Reset the value of each cell to an empty string
  cells.forEach(cell => cell.innerHTML = '');
}
