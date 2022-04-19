/*
class JackalGame {
    field = [
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
    ];
    cards = {
        empty1: 10,
        empty2: 10,
        empty3: 10,
        empty4: 10,
        double: 6,
        arrow1sideStraightRight: 3,
        arrow1sideRightUp: 3,
        arrow1sideLeftRight: 3,
        arrow2sidesDiagonal: 3,
        arrow3sides: 3,
        arrow4sidesLeftRight: 3,
        arrow4sidesDiagonal: 3,
        trap: 3,
        trap2: 5,
        trap3: 4,
        trap4: 2,
        trap5: 1,
        rum: 4,
        animal: 4,
        parachute: 2,
        canon: 2,
        gold1: 5,
        gold2: 5,
        gold3: 3,
        gold4: 2,
        gold5: 1,
        horse: 2,
        safeZone: 2,
        resurrection: 1,
        airplane: 1,
        dead: 5
    }

    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    feee() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                const randomNum = this.getRandomNum(0, Object.keys(this.cards).length);
                let key = Object.keys(this.cards)[randomNum];
                if (this.cards[key] !== 0) {
                    this.field[i][j] = key;
                    this.cards[key] -= 1;
                } else {
                    j--;
                    console.log('aaaaaaaaaa')
                }

            }
        }
    }

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
*/
let field = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
];
let cards = {
    empty1: 10,
    empty2: 10,
    empty3: 10,
    empty4: 10,
    double: 6,
    arrow1sideStraightRight: 3,
    arrow1sideRightUp: 3,
    arrow1sideLeftRight: 3,
    arrow2sidesDiagonal: 3,
    arrow3sides: 3,
    arrow4sidesLeftRight: 3,
    arrow4sidesDiagonal: 3,
    trap: 3,
    trap2: 5,
    trap3: 4,
    trap4: 2,
    trap5: 1,
    rum: 4,
    animal: 4,
    parachute: 2,
    canon: 2,
    gold1: 5,
    gold2: 5,
    gold3: 3,
    gold4: 2,
    gold5: 1,
    horse: 2,
    safeZone: 2,
    resurrection: 1,
    airplane: 1,
    dead: 1
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            const randomNum = rando(0, Object.keys(cards).length-1);
            let key = Object.keys(cards)[randomNum];
            if (cards[key] !== 0) {
                field[i][j] = key;
                cards[key] -= 1;
            } else {
                j--;
                console.log('aaaaaaaaaa')
            }

        }
    }
console.log (field);