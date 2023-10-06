import { GolCell } from './gol-cell.mjs';

export class GolGame {
    static DEFAULT_ROWS = 50;
    static DEFAULT_COLS = 130;

    #rows = 0;
    #cols = 0;

    /**
     * @type Array<Array<GolCell>>
     */
    #board = [ ];

    /** @property {GolRules} */
    rules;

    /**
     *
     * @param {GolRules} rules the ruleset this gane should follow
     * @param {number} rows (opt) the number of cell rows
     * @param {number} cols (opt) the number of cell columns
     */
    constructor(rules, rows, cols) {
        this.rules = rules;
        this.#rows = rows ?? GolGame.DEFAULT_ROWS;
        this.#cols = cols ?? GolGame.DEFAULT_COLS;

        this.#createCells();
        this.#linkNeighbours();
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     */
    cell(row, col) {
        if ( this.#rowOutOfBounds(row) || this.#colOutOfBounds(col)) {
            throw new Error(`Error! row:${row} or col:${col} does not exist`);
        }
        return this.#board[row][col];
    }

    nextState() {
        // calculate next state
        this.#board.forEach((row) => {
            row.forEach((cell) => cell.nextState());
        });
        // activate it
        this.#board.forEach((row) => {
            row.forEach((cell) => cell.activate());
        });
    }

    #rowOutOfBounds(row) {
        return row < 0 || row >= this.#board.length;
    }

    #colOutOfBounds(col) {
        return col < 0 || col >= this.#board[0].length;
    }

    #createCells() {
        for (let r = 0; r < this.#rows; r += 1) {
            const row = [];
            this.#board.push(row)
            for (let c = 0; c < this.#cols; c += 1) {
                row.push(new GolCell(this));
            }
        }
    }

    #linkNeighbours() {
        const neighConf = [
            { row: -1, col: -1 },
            { row: -1, col:  0 },
            { row: -1, col:  1 },
            { row:  0, col: -1 },
            { row:  0, col:  1 },
            { row:  1, col: -1 },
            { row:  1, col:  0 },
            { row:  1, col:  1 },
        ];
        for (let r = 0; r < this.#rows.length; r += 1) {
            for (let c = 0; c < this.#rows[r].length; c += 1) {
                const cell = this.#board[r][c];
                for (nextNeigh of neighConf) {
                    const neighRow = r + nextNeigh.row;
                    const neighCol = c + nextNeigh.col;
                    const neigh = this.#board[neighRow][neighCol];
                    cell.addNeighbour(neigh);
                }
            }
        }
    }
}