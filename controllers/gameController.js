const {rando} = require('@nastyox/rando.js');
class JackalGame {
    field = [
        ['sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'ship', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea'],
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
        ['sea', 'sea', 'sea', 'sea', 'sea', 'sea', 'ship', 'sea', 'sea', 'sea', 'sea', 'sea', 'sea']
    ];



    cardsCount = {
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

    cards = {
        empty1: {name: 'empty1', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        empty2: {name: 'empty2', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        empty3: {name: 'empty3', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        empty4: {name: 'empty4', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        double: {name: 'double', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow1sideStraightRight: {name: 'arrow1sideStraightRight', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow1sideRightUp: {name: 'arrow1sideRightUp', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow1sideLeftRight: {name: 'arrow1sideLeftRight', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow2sidesDiagonal: {name: 'arrow2sidesDiagonal', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow3sides: {name: 'arrow3sides', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow4sidesLeftRight: {name: 'arrow4sidesLeftRight', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        arrow4sidesDiagonal: {name: 'arrow4sidesDiagonal', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        trap: {name: 'trap', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        trap2: {name: 'trap2', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        trap3: {name: 'trap3', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        trap4: {name: 'trap4', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        trap5: {name: 'trap5', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        rum: {name: 'rum', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        animal: {name: 'animal', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        parachute: {name: 'parachute', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        canon: {name: 'canon', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        gold1: {name: 'gold1', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        gold2: {name: 'gold2', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        gold3: {name: 'gold3', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        gold4: {name: 'gold4', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        gold5: {name: 'gold5', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        horse: {name: 'horse', action: null, moment: null, typeAction: null, canStay: false, canEnterWithItems: true},
        safeZone: {name: 'safeZone', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: false},
        resurrection: {name: 'resurrection', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: false},
        airplane: {name: 'airplane', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        dead: {name: 'dead', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
        sea: {name: 'sea', action: null, moment: null, typeAction: null, canStay: true, canEnterWithItems: true},
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

    /*getAllCards() {
        for (let i = 0; i < 31; ++i) {
            let key = Object.keys(this.cardsCount)[i];
            for (let j = 0; j < this.cardsCount[key]; ++j)
                this.allCards.push(key);
        }
    }

    fillField() {
        for (let i = 0; i < this.field.length; i++)
            for (let j = 0; j < this.field[i].length; j++) {
                const rng = rando(this.allCards.length - 1);
                if (this.field[i][j] !== 'sea' && this.field[i][j] !== 'ship') {
                    this.field[i][j] = this.allCards[rng];
                    this.allCards.splice(rng, 1);
                }
            }
    }*/
    getAllCards() {
        for (let i = 0; i < 31; ++i) {
            let key = Object.keys(this.cardsCount)[i];
            let value = Object.values(this.cards)[i];
            for (let j = 0; j < this.cardsCount[key]; ++j)
                this.allCards.push(value);
        }
    }


    fillField() {
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

    moveShipToRight(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[0] === 12 || cPos[0] === 0)
            if (cPos[1] + 1 !== 12) {
                this.field[cPos[0]][cPos[1]] = "sea";
                cPos[1] += 1;
                this.field[cPos[0]][cPos[1]] = "ship";
                this.players[playerIdx].position = cPos;
            }
    }

    moveShipToLeft(playerIdx) {
        let cPos = this.players[playerIdx].position;
        if (cPos[0] === 12 || cPos[0] === 0)
            if (cPos[1] - 1 !== 0) {
                this.field[cPos[0]][cPos[1]] = "sea";
                cPos[1] -= 1;
                this.field[cPos[0]][cPos[1]] = "ship";
                this.players[playerIdx].position = cPos;
            }
    }

    getPlayer(playerIdx) {
        return this.players[playerIdx];
    }
}

// Функция для начала игры, которая возвращает объект игры
exports.startGame =  function (req, res) {
    const playerOne = {name: "Andrey"};
    const playerTwo = {name: "Ruslan"};

    let game = new JackalGame(playerOne, playerTwo);
    game.getAllCards();
    game.fillField();
    return game;
};
