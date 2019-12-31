class State {

    //Size of board
    static board_width = 4
    static board_height = 5
    board = new Array(20)

    constructor(key) {

        //Convert hashed array type string to array of types
        let typeMap = key.split('')

        //Convert to int
        typeMap = typeMap.map((x) => {
            return parseInt(x)
        })

        // For each position on board, if it is empty, create a new shape
        // and add it to the board
        for (let index = 0; index < this.board.length; index++) {
            const value = this.board[index];
            const type = typeMap[index];
            if (value == undefined) {
                const shape = new Shape(index, type)
                this.add(shape)
            }
        }
    }

    // Add a shape to the board.
    add(shape) {
        shape.foreach((i) => {
            this.board[i] = shape
        })
    }

    // Remove shape from board
    remove(shape) {
        shape.foreach((i) => {
            this.board[i] = new Shape(shape.topLeftIndex, Shape.empty)
        })
    }

    // Convert board to a string representing types and
    // their positions
    key() {
        let str = ""
        for (let index = 0; index < this.board.length; index++) {
            const element = this.board[index];
            if (element == undefined) {
                str += "0"
            } else {
                str += element.type
            }
        }
        return str
    }
}