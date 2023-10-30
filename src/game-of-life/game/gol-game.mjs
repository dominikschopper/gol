import { GolCell } from './gol-cell.mjs';

export class GolGame {
    static DEFAULT_ROWS = 50;
    static DEFAULT_COLS = 130;

    #rows = 0;
    #cols = 0;

    /**
     * @type Array<Array<GolCell>>
     */
    #board = [];

    /**
     * @property {Array<Function>}
     */
    #nextStateCallbacks = [];

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
     * @returns {GolCell}
     */
    cell(row, col) {
        if (this.#rowOutOfBounds(row) || this.#colOutOfBounds(col)) {
            throw new Error(`Error! row:${row} or col:${col} does not exist`);
        }
        return this.#board[row][col];
    }

    nextState() {
        // calculate next state
        this.forEveryCell((cell) => cell.nextState());

        // activate it
        this.forEveryCell((cell) => cell.activate());
        // call callback for every cell
        this.#nextStateCallbacks.forEach(cb => {
            this.forEveryCell(cb);
        });
    }

    /**
     * calls the given callback function for every cell
     * and provides it with two arguments
     *
     * @example cb(cell, {row: rowId, cell: cellId})
     * @param {*} cb a callback function
     */
    forEveryCell(cb) {
        this.#board.forEach((row, rowId) => {
            row.forEach((cell, colId) => {
                cb(cell, {"row": rowId, "col": colId});
            });
        });
    }

    /**
     * calls the given callback function for every cell
     * on each stateChange and provides it with two arguments
     *
     * @example cb(cell, {row: rowId, cell: cellId})
     * @param {Function} cb the callback function
     */
    addNextStateCallback(cb) {
        this.#nextStateCallbacks.push(cb);
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
            this.#board.push(row);
            for (let c = 0; c < this.#cols; c += 1) {
                row.push(new GolCell(this));
            }
        }
    }

    #linkNeighbours() {
        const neighConf = [
            { row: -1, col: -1 },
            { row: -1, col: 0 },
            { row: -1, col: 1 },
            { row: 0, col: -1 },
            { row: 0, col: 1 },
            { row: 1, col: -1 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
        ];

        this.#board.forEach((row, rowId) => {
            row.forEach((cell, colId) => {
                neighConf.forEach(nc => {
                    let neighRow = rowId + nc.row;
                    let neighCol = colId + nc.col;
                    let neigh;
                    try {
                        neigh = this.#board[neighRow][neighCol];
                    } catch(e) {
                        return;
                    }
                    if (neigh) {
                        cell.addNeighbour(neigh);
                    }
                });
            });
        });
    }
}