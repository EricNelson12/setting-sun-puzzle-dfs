class Shape {
    static empty = 0
    static yellow = 1
    static blue_vert = 2
    static blue_horz = 3
    static red = 4

    type = this.empty
    width = 1
    height = 1
    topLeftIndex = 0

    constructor(start, type) {
        this.topLeftIndex = start
        this.type = type

        switch (type) {
            case Shape.blue_vert:
            case Shape.yellow:
            case Shape.empty:
                this.width = 1
                break;
            default:
                this.width = 2
                break;
        }

        switch (type) {
            case Shape.blue_horz:
            case Shape.yellow:
            case Shape.empty:
                this.height = 1
                break;
            default:
                this.height = 2
                break;
        }
    }

    // Do function for each index in shape
    foreach(func) {
        let row = this.topLeftIndex
        for (let i = 0; i < this.height; i++) {
            let col = row
            for (let j = 0; j < this.width; j++) {
                func(col)
                col = getRight(col)
            }
            row = getDown(row)
        }
    }

    // Looks down left edge, if it only finds empties, then it 
    move(state, startIndex, length, nextIndex, checkDirection) {
        let newState = new State(state.key())
        let oldBoard = state.board
        let elem = startIndex
        this.top
        let noConflict = true;

        // Check all spaces to the left
        for (let i = 0; i < length; i++) {
            let checkSpace = checkDirection(elem)
            if (oldBoard[checkSpace].type != Shape.empty) {
                noConflict = false
            }
            elem = nextIndex(elem)
        }

        if (noConflict) {
            // Remove shape from previous slots
            newState.remove(this)
            // Add shape to the left
            newState.add(new Shape(checkDirection(this.topLeftIndex), this.type))
        }else{
            return false
        }

        // add shape
        let retState = new State(newState.key())
        drawState(retState)
        return retState
    }

    moveLeft(state) {
        return this.move(state, this.topLeftIndex, this.height, getDown, getLeft)
    }

    moveRight(state) {
        return this.move(state, this.topLeftIndex + this.width - 1, this.height, getDown, getRight)
    }

    moveUp(state) {
        return this.move(state, this.topLeftIndex, this.width, getRight, getUp)
    }

    moveDown(state) {
        return this.move(state, getDown(this.topLeftIndex, this.height - 1), this.width, getRight, getDown)
    }


}