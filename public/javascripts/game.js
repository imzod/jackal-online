/*
0 | 1 | 2
--+---+--
3 | 4 | 5
--+---+--
6 | 7 | 8
*/
class TicTacToe {
    static winPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    field = [null, null, null, null, null, null, null, null, null];
    players = [];

    constructor(playerOneInfo, playerTwoInfo) {
        this.players = [
            {info: playerOneInfo, symbol: "X"},
            {info: playerTwoInfo, symbol: "O"}
        ];
    }

    checkIsWin(playerIdx) {
        for (const winPosition of TicTacToe.winPositions) {
            let isWin = true;

            for (const cell of winPosition) {
                isWin = isWin && this.field[cell] === this.players[playerIdx].symbol;
            }

            if (isWin) {
                winPosition.forEach(winCell => {
                    cells[winCell].classList.add("winPosition");
                });
                console.log(winPosition)
                return true;
            }
        }
        return false;
    }

    checkIsDraw() {
        for (const cell of this.field) {
            if (cell === null) {
                return false;
            }
        }
        return true;
    }

    makeMove(playerIdx, position) {
        if (!this.isPossibleMove(position)) {
            throw new Error("Illegal move");
        }

        this.field[position] = this.players[playerIdx].symbol;
    }

    isPossibleMove(position) {
        return position < this.field.length && !this.field[position];
    }

    getPlayer(playerIdx) {
        return this.players[playerIdx];
    }
}

const isPlayerOneFirst = true;
const playerOne = {name: "Andrey"};
const playerTwo = {name: "Ruslan"};

let game = isPlayerOneFirst ? new TicTacToe(playerOne, playerTwo) : new TicTacToe(playerTwo, playerOne);
let gameTurns = [];
const cells = document.querySelectorAll(".game-field_cell");
const cross = document.querySelector("#cross");
const circle = document.querySelector("#circle");
let flag = 0;
let isOver = false;


let myCells = Array.from(cells)
const resetButton = document.querySelector("input.reset-button");
const undoButton = document.querySelector("input.undo-button");
const gameStatus = document.querySelector("#gameStatus");
const playersNames = document.querySelector("#player-form");
playersNames.addEventListener('submit', addPlayers);

function addPlayers(event) {
    event.preventDefault();

    if (this.player1.value === '' || this.player2.value === '') {
        alert('Введите имена игроков');
        return;
    }

    const playerFormContainer = document.querySelector('.enter-players');
    const gameBoard = document.querySelector('#game-board');
    playerFormContainer.classList.add('hide-container');
    gameBoard.classList.remove('hide-container');

    playerOne.name = this.player1.value;
    playerTwo.name = this.player2.value;
    gameStatus.innerHTML = `Игрок ${game.getPlayer(flag % 2).info === playerOne ? playerOne.name : playerTwo.name}, твой ход`;
    console.dir(this.player1)
}

resetButton.addEventListener('click', reset);
undoButton.addEventListener('click', undo);

function status() {

    if (game.checkIsWin(flag % 2)) {
        const winner = game.getPlayer((flag + 1) % 2).info === playerOne ? playerOne.name : playerTwo.name;
        gameStatus.innerHTML = `Игрок ${winner} победил`;
        isOver = true;
    } else if (game.checkIsDraw()) {
        gameStatus.innerHTML = "Ничья";
        isOver = true;
    } else if (!isOver) {
        gameStatus.innerHTML = `Игрок ${game.getPlayer(flag % 2).info === playerOne ? playerOne.name : playerTwo.name}, твой ход`;
    }
}


function reset() {
    gameTurns = [];
    for (let cell of cells) {
        cell.innerHTML = '';
    }
    game = isPlayerOneFirst ? new TicTacToe(playerOne, playerTwo) : new TicTacToe(playerTwo, playerOne);
    flag = 0;
    isOver = false;
    for (let cell of cells) {
        cell.classList.remove("winPosition");
    }
    gameStatus.innerHTML = "";
    status();
}

function undo() {
    let undoPop = gameTurns.pop();
    game.field[undoPop] = null;
    myCells[undoPop].innerHTML = '';
    flag--;
    isOver = false;
    for (let cell of cells) {
        cell.classList.remove("winPosition");
    }
    gameStatus.innerHTML = "";
    status();
}


for (let cell of myCells) {
    cell.onclick = () => {
        if (isOver) {
            return;
        }
        try {
            gameTurns.push(myCells.indexOf(cell))

            game.makeMove((flag + 1) % 2, myCells.indexOf(cell));
            flag++;

            if (flag % 2) {
                cell.innerHTML = cross.outerHTML;
            } else {
                cell.innerHTML = circle.outerHTML;
            }
            status();
            if (game.checkIsWin(flag % 2)) {
                const winner = game.getPlayer((flag + 1) % 2).info === playerOne ? playerOne.name : playerTwo.name;
                console.log(`Player ${winner} win`);
                isOver = true;
            }


        } catch
            (exc) {
            if (exc instanceof Error) {
                console.log(exc.message);
            } else {
                console.log(exc);
            }
        }

    }
}


