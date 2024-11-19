let boxes = document.querySelectorAll(".box");

let reset = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let mesgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let isWinner = false; // Track if there is a winner
const winPattterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Initialize to track the turn
const resetGame = () => {
  turnO = true;
  isWinner = false; // Reset winner status
  count = 0; // Reset the count
  enableBoxes();
  mesgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") { // Check if box is empty
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }

      // Disable the box so it can't be clicked again
      box.disabled = true;
      count++;

      if (checkWinner()) {
        isWinner = true;
      }

      if (count === 9 && !isWinner) {
        msg.innerText = "It's a draw!";
        mesgContainer.classList.remove("hide");
      }
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}`;
  mesgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const checkWinner = () => {
  for (let pattern of winPattterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return true;
    }
  }
  return false;
};
newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
