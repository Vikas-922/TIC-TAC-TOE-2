const boxes = document.querySelectorAll(".box");
const chanceImg = document.querySelector(".chance > img");
chanceImg.src = "images/cross2.png";
const animationContainer = document.getElementById("winningAnimation");
const container = document.querySelector(".container");
const winimg = document.getElementById("winim");
document.getElementById('resetButton').addEventListener('click', resetGame);

let chancePlayer1 = true;
let player1arr = [];
let player2arr = [];
let checkedivArr = [];

const winConditions = [
  [1, 2, 3], // First row
  [4, 5, 6], // Second row
  [7, 8, 9], // Third row
  [1, 4, 7], // First column
  [2, 5, 8], // Second column
  [3, 6, 9], // Third column
  [1, 5, 9], // Left diagonal
  [3, 5, 7], // Right diagonal
];

boxes.forEach((element) => {
  element.addEventListener("click", clicked);
});

// console.log(boxes);

function clicked(e) {
  if (e.target.tagName === "IMG" || e.target.querySelector("img")) {
    console.log("Image tag already present (clicked directly on the image).");
    return; // Stop further execution
  }

  divtag = e.target;
  imgTag = document.createElement("img");

  // Check if the img src contains "circle.png" and change it   (ele.tagName === 'IMG' && ele.src.includes("circle.png"))
  if (chancePlayer1) {
    imgTag.src = "images/cross2.png"; // Replace with the new image path
    // imgTag.classList.add("")
    player1arr.push(parseInt(divtag.id));
    divtag.appendChild(imgTag);
    checkedivArr.push(divtag);
    togglePlayer();
    checkWin(player1arr, "cross");
  } else {
    imgTag.src = "images/circle.png";
    player2arr.push(parseInt(divtag.id));
    divtag.appendChild(imgTag);
    checkedivArr.push(divtag);
    togglePlayer();
    checkWin(player2arr, "circle");
  }

   console.log(checkedivArr);
  // console.log("p2 => " + player2arr);
}

function togglePlayer() {
  chancePlayer1 = chancePlayer1 ? false : true;
  chanceImg.src = chancePlayer1 ? "images/cross2.png" : "images/circle.png";
  //chanceImg.src = "images/circle.png" ;
  // console.log(chanceImg);
}

function checkWin(playerarr, player) {
  // console.log("check win", player, playerarr);
  let times3 = 0;
  for (const i of winConditions) {
    times3 = 0;
    for (const j of i) {
      if (playerarr.includes(j)) {
        times3++;
      } else {
        break;
      }
    }
    if (times3 === 3) {
      console.log(player + "  wins");
      showWinningAnimation(player); // Trigger the winning animation
      
      break;
    }
  }
}

function showWinningAnimation(player) {

  winimg.src = player==="cross" ? "images/cross2.png" : "images/circle.png";
  // Add the fade-out class to start the transition
  container.classList.add("fade-out");

  // Show the container
  animationContainer.style.display = "block";

  // Optionally, hide the animation after some time
  setTimeout(() => {
    console.log("edd");
    animationContainer.style.display = "none";
    container.classList.add("no-transition"); // prevent fadeout animation when removing fadeout
    container.classList.remove("fade-out");
    resetGame();  // after that clears 

    setTimeout(() => {
      // fade out will take 2s for animation when removing it
      console.log("ccc");
      container.classList.remove("no-transition");
    }, 2000);
    //container.classList.remove('no-transition');
  }, 2600); // Adjust the time as needed
}

function resetGame() {
  checkedivArr.forEach(element =>{
    element.firstElementChild.remove();
  });

  checkedivArr.length=0;
  chancePlayer1 = true;
  player1arr.length = 0;
  player2arr.length = 0;
  chanceImg.src = "images/cross2.png";
}
