window.onload = () => {
    init()
}

var interval = {}
var visited = []
var final_state = 0
var final_path_taken = null

function init() {
    let startingState = '01102112233224422442'
    board_state = new State(startingState)
    // drawState(board_state)
    // interval = setInterval(moveRandom, 100)
    moveDfs(startingState)

}

function solution(path) {
    for (let index = 0; index < path.length; index++) {

        setTimeout(function timer() {
            const element = path[index];
            drawState(new State(element))
        }, index * 100);
    }
}

async function moveDfs(stateHash, path_taken = []) {
    await sleep(50)
    var state = new State(stateHash)
    drawState(state)
    let board = state.board
    path_taken.push(stateHash)

    if (checkFinished(state)) {
        final_state = state.key()
        if (final_path_taken == null) {
            final_path_taken = path_taken
        }
        console.log(path_taken)
        return;
    } else {
        let empties = board.filter((element => element.type == Shape.empty))

        //Check each empty space
        empties.forEach(empty => {
            findChoices(empty, board, state).forEach((hash) => {
                if (visited[hash] == undefined) {
                    moveDfs(hash, path_taken.slice())
                }
                visited[hash] = hash
            })
        });
    }
}

function findChoices(empty, board, startState) {
    let choices = []
    let emptyIndex = empty.topLeftIndex

    let check = board[getUp(emptyIndex)]
    if (check != undefined) {
        let state = check.moveDown(startState)
        if (state) {
            choices.push(state.key())
        }
    }

    check = board[getDown(emptyIndex)]
    if (check != undefined) {
        let state = check.moveUp(startState)
        if (state) {
            choices.push(state.key())
        }
    }
    check = board[getLeft(emptyIndex)]
    if (check != undefined) {
        let state = check.moveRight(startState)
        if (state) {
            choices.push(state.key())
        }
    }
    check = board[getRight(emptyIndex)]
    if (check != undefined) {
        let state = check.moveLeft(startState)
        if (state) {
            choices.push(state.key())
        }
    }

    return choices
    //check each direction
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function moveRandom() {
    if (checkFinished()) {
        clearInterval(interval)
        return
    }
    let board = board_state.board
    let empties = board.filter((element => element.type == Shape.empty))
    let empty = empties[Math.floor(Math.random() * 2)]
    //Random number 1 - 4
    let shape = undefined
    while (shape == undefined) {
        switch (Math.floor(Math.random() * 5)) {
            case 1:
                shape = board[getUp(empty.topLeftIndex)]
                if (shape != undefined) {
                    board_state = shape.moveDown(board_state)
                }
                break;
            case 2:
                shape = board[getDown(empty.topLeftIndex)]
                if (shape != undefined) {
                    board_state = shape.moveUp(board_state)
                }
                break;
            case 3:
                shape = board[getLeft(empty.topLeftIndex)]
                if (shape != undefined) {
                    board_state = shape.moveRight(board_state)
                }
                break;
            case 4:
                shape = board[getRight(empty.topLeftIndex)]
                if (shape != undefined) {
                    board_state = shape.moveLeft(board_state)
                }
                break;

        }
    }
}

function checkFinished(state = board_state) {
    let redBlock = state.board.find((element => element.type == Shape.red))
    if (redBlock.topLeftIndex == 1) {
        return true
    } else {
        return false
    }

}

function drawState(state) {
    let cx = document.querySelector("canvas").getContext("2d")
    cx.clearRect(0, 0, 400, 500);
    let board = state.board
    let square_size = 50
    let border = 10

    for (let index = 0; index < board.length; index++) {
        const element = board[index]
        if (element.type == Shape.empty) { continue }
        const start = element.topLeftIndex

        if (element.type == Shape.yellow) {
            cx.fillStyle = "yellow"
        } else if (element.type == Shape.red) {
            cx.fillStyle = "red"
        } else {
            cx.fillStyle = "blue"
        }

        let row = Math.floor(start / State.board_width) * square_size
        let col = (start % State.board_width) * square_size
        cx.fillRect(col, row, square_size * element.width - border, square_size * element.height - border)
    }

}