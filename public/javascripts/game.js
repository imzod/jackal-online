function generate(map) {
    const cells = document.querySelectorAll(".cell");
    let flag = 0;

    let myCells = Array.from(cells)
    const gameStatus = document.querySelector("#gameStatus");

    let newArray = map.flat()

    let sessionCells = JSON.parse(sessionStorage.getItem('cells') || '[]');
    for (let sessionCell of sessionCells) {
        const cell = myCells[sessionCell];
        cell.innerHTML = "";
        const newImg = document.createElement('img');
        newImg.classList.add("img-fluid-custom", "border-custom", "border-dark");
        newImg.src = `/imgs/${newArray[myCells.indexOf(cell)].name}.png`
        cell.append(newImg);
    }

    socket.on('open cell', function (data) {
        const cell = myCells[data.index];
        if (newArray[myCells.indexOf(cell)] !== 'sea' && newArray[myCells.indexOf(cell)] !== 'ship') {
            cell.innerHTML = "";
            const newImg = document.createElement('img');
            newImg.classList.add("img-fluid-custom", "border-custom", "border-dark");
            newImg.src = `/imgs/${newArray[myCells.indexOf(cell)].name}.png`
            cell.append(newImg);
            console.log(newArray[myCells.indexOf(cell)].name)
            let sessionCells = JSON.parse(sessionStorage.getItem('cells') || '[]');
            sessionCells.push(data.index);
            sessionStorage.setItem('cells', JSON.stringify(sessionCells));
        }
    })

    for (let cell of myCells) {
        cell.onclick = () => {
            try {
                socket.emit('open cell', {
                    index: myCells.indexOf(cell)
                });


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
}
