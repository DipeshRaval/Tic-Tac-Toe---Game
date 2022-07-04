console.log("HEllo JS")

let ting = new Audio("ting.mp3")
let gameOver = new Audio("gameover.mp3")
let turn = "X";
let gameWin = false
let boxes = document.getElementsByClassName("box");
let infotext = document.querySelector(".infotext");
let reset = document.getElementById("reset")

const chnageTurn = ()=>{
  if(turn == "X")
  {
    turn = "0";
  }
  else{
    turn = "X";
  }
}

// cheack win
const cheakWin = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let won = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ]

  won.forEach(e => {
    if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== ""))
    {
      gameWin = true
      infotext.innerText = `Congrets, ${boxtexts[e[0]].innerText} You Win the game , To start a new game click on Reset Button`;
      gameOver.play()
      reset.style.display = "block";
      document.getElementById("exitediIMG").style.width = "200px"
      document.getElementById("line").style.width = "20vw"
      document.getElementById("line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
    }
  })
}

// Game logic
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    let flag = false
    if(boxtext.innerText == "")
    {
      boxtext.innerText = turn;
      chnageTurn()
      ting.play()
      cheakWin()
      if(gameWin == false)
      {
        infotext.innerText = "Turn for a "+turn+ " player"
      }
    }
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach((ele)=>{
      if (ele.innerText == "")
      {
        flag = true
      }
    })
    if (flag == false && gameWin == false)
    {
      infotext.innerText = "Game is a tie,To start a new Game click on Reset Button";
      reset.style.display = "block";
    }
  })
})

const resetFunc = () => {
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    boxtext.innerText = "";
  })
  turn = 'X'
  gameWin = false;
  infotext.innerText = "Turn for a "+turn+ " player"
  document.getElementById("exitediIMG").style.width = "0px"
  document.getElementById("line").style.width = "0vw"
  reset.style.display = "none";
}

reset.addEventListener("click",resetFunc)
