function getDown(index, n = 1) {
    let res = index + (State.board_width * n)
    if (res >= State.board_height * State.board_height) {
        res = null
    }
    return res
}

function getUp(index) {
    let res = index - State.board_width
    if (res < 0) {
        res = null
    }
    return res
}
function getLeft(index) {
    let res = index - 1
    if (res % State.board_width > index % State.board_width) {
        res = null
    }
    return res
}
function getRight(index) {
    let res = index + 1
    if (res % State.board_width < index % State.board_width) {
        res = null
    }
    return res
}