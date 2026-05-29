let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

newGameBtn.style.display = "none";

let turnO = true;    //checks the turn of playerX ,PlayerO
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

    resetBtn.disabled = false;
    newGameBtn.style.display = "none";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO === true){          //now PlayerO turn
            box.innerText = "O";
            turnO = false;           //set turnO false because give the turn to X
        }else{                       //Now PlayerX turn
            box.innerText = "X";
            turnO = true;            //set turnO true because give the turn to O
        }
        box.disabled = true;         //disabled button after one click to prevent changing the value again 

        checkWinner();
    });
});

const disableBoxes = ()  => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()  => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    newGameBtn.style.display = "inline";
    resetBtn.disabled = true;

}


const checkWinner = () =>  {
    for(let pattern of winPatterns){
        console.log(pattern[0], pattern[1], pattern[2]);
        console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
        );  //this is a position to check

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {    //checks the winning conditions
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        };
    };
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);