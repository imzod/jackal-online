class JackalGame {
    field = [
        ['sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea'],
        ['sea', 'sea', null, null, null, null, null, null, null, null, null, 'sea', 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', null, null, null, null, null, null, null, null, null, null, null, 'sea'],
        ['sea', 'sea', null, null, null, null, null, null, null, null, null, 'sea', 'sea'],
        ['sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea']
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
        dead: 1,
        sea: 0
    }

    players = [];


    position = [];

    constructor(playerOneInfo, playerTwoInfo) {
        this.players = [
            {info: playerOneInfo, symbol: "X"},
            {info: playerTwoInfo, symbol: "O"}
        ];
        this.players[0].position = [0, 6]
        this.players[1].position = [12, 6]
    }

    getPosition(playerIdx) {
        return this.players[playerIdx].position;
    }

    allCards = []
    getAllCards(){
        for (let i = 0; i < 31; ++i){
            let key = Object.keys(this.cards)[i];
            for (let j = 0; j < this.cards[key]; ++j)
                this.allCards.push(key);
        }
    }

    fillField(){
        for (let i = 0; i < this.field.length; i++)
            for (let j = 0; j < this.field[i].length; j++) {
                const rng = rando(this.allCards.length - 1);
                if (this.field[i][j] !== 'sea' && this.field[i][j] !== 'ship') {
                    this.field[i][j] = this.allCards[rng];
                    this.allCards.splice(rng, 1);
                }
            }
    }




    isPossibleMove(pos) {
        let flag = false;
        for (let x = pos[0] - 1; x <= pos[0] + 1; ++x)
            for (let y = pos[1] - 1; y <= pos[1] + 1; ++y)
                if (x >= 0 && y >= 0 && x < this.field[0].length && y < this.field[1].length) {
                    if (this.field[x][y] !== "sea")
                        return true;
                }
        return flag;
    }

    moveToUp(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[0] - 1 > 0)
            if (this.field[cPos[0] - 1][cPos[1]] !== "sea") {
                cPos[0] -= 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToDown(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[0] + 1 < this.field[0].length)
            if (this.field[cPos[0] + 1][cPos[1]] !== "sea") {
                cPos[0] += 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToRigth(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] + 1 < this.field[1].length)
            if (this.field[cPos[0]][cPos[1] + 1] !== "sea") {
                cPos[1] += 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToLeft(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] - 1 > 0)
            if (this.field[cPos[0]][cPos[1] - 1] !== "sea") {
                cPos[1] -= 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToLeftUp(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] - 1 > 0 && cPos[0] - 1 > 0)
            if (this.field[cPos[0] - 1][cPos[1] - 1] !== "sea") {
                cPos[0] -= 1;
                cPos[1] -= 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToRightUp(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] + 1 < this.field[1].length && cPos[0] - 1 > 0)
            if (this.field[cPos[0] - 1][cPos[1] + 1] !== "sea") {
                cPos[0] -= 1;
                cPos[1] += 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToLeftDown(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] - 1 > 0 && cPos[0] + 1 < this.field[0].length)
            if (this.field[cPos[0] + 1][cPos[1] - 1] !== "sea") {
                cPos[0] += 1;
                cPos[1] -= 1;
                this.players[playerIdx].position = cPos;
            }
    }

    moveToRightDown(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[1] + 1 < this.field[1].length && cPos[0] + 1 < this.field[0].length)
            if (this.field[cPos[0] + 1][cPos[1] + 1] !== "sea") {
                cPos[0] += 1;
                cPos[1] += 1;
                this.players[playerIdx].position = cPos;
            }
    }

    getPlayer(playerIdx) {
        return this.players[playerIdx];
    }

}

const isPlayerOneFirst = true;
const playerOne = {name: "Andrey"};
const playerTwo = {name: "Ruslan"};

let game = new JackalGame(playerOne, playerTwo);
game.getAllCards();
game.fillField();

const cells = document.querySelectorAll(".cell");
let flag = 0;


let myCells = Array.from(cells)
const gameStatus = document.querySelector("#gameStatus");

let newArray = game.field.flat()

for (let cell of myCells) {
    cell.onclick = () => {
        try {
            flag++;
            if (newArray[myCells.indexOf(cell)] !== 'sea') {
                if (flag % 2) {
                    cell.innerHTML = "";
                    const newImg = document.createElement('img');
                    newImg.classList.add("img-fluid-custom", "border-custom", "border-dark");
                    newImg.src = `/imgs/${newArray[myCells.indexOf(cell)]}.png`
                    cell.append(newImg);
                } else {
                    cell.innerHTML = "";
                    const newImg = document.createElement('img');
                    newImg.classList.add("img-fluid-custom", "border-custom", "border-dark");
                    newImg.src = `/imgs/${newArray[myCells.indexOf(cell)]}.png`
                    cell.append(newImg);
                }
            }
            console.log(newArray[myCells.indexOf(cell)]);


            gameStatus.innerHTML = `Игрок ${game.getPlayer(flag % 2).info === playerOne ? playerOne.name : playerTwo.name}, твой ход`;

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