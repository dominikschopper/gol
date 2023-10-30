export class GameRenderer {

    /** @property {GolCell} */
    #game = null;

    /** @property {HTMLElement} */
    #element = null;

    /** @property {Array<Array<HTMLElements>>} */
    #cells = [];

    /**
     *
     * @param {GolGame} game the instance of the GolGame
     * @param {string} selector the selector of the html element holding the game
     */
    constructor(game, selector) {
        this.#element = $(selector);
        console.log('/#element', this.#element);
        this.#game = game;
        if (!this.#element) {
            const errormessage = `Error: I can't work lite that! Element with selector "${selector}" does not exist.`;
            console.warn(errormessage)
            throw new Error(errormessage);
        }

        this.#initialize();
    }

    #initUpdate() {
        /**
         * @param {GolCell} cell
         * @param {object} pos an object {row: rowId, col: colId}
         */
        const gameStatusCallback = (cell, pos) => {
            console.log('%o/%o: cell.state>%o', pos.row, pos.col, cell.state);
            if (cell.state === true) {
                console.log("gameStatusCallback for pos:%o", pos);
                this.#cells[pos.row][pos.col].querySelector('input').checked = true;
                return;
            }
            this.#cells[pos.row][pos.col].querySelector("input").checked = false;
            return;
        };

        this.#game.addNextStateCallback(gameStatusCallback);
    }

    get allCells() {
        return this.#cells;
    }

    /* @TODO: implement as WeakMap */
    #initialize() {
        let currentRowId = -1;
        let tr;
        this.#game.forEveryCell((_, pos) => {
            if (pos.row !== currentRowId) {
                tr = document.createElement('tr');
                this.#element.appendChild(tr);
                currentRowId = pos.row;
                this.#cells.push([]);
            }
            let td = createCellTd(pos);
            tr.appendChild(td);
            this.#cells[pos.row][pos.col] = td
        });
        this.#setupCellClick();
        this.#initUpdate();
    }

    #setupCellClick() {
        this.#element.addEventListener('change', ev => {
            const htmlCell = ev.target;
            const pos = {
                row: htmlCell.dataset.row,
                col: htmlCell.dataset.col
            };
            console.log("clicked pos(%o)", pos, htmlCell.dataset);
            const cell = this.#game.cell(pos.row, pos.col);
            console.log(' -> set state to:%o', !cell.state);
            // clicks must set state and activate it directly
            cell.setState(!cell.state);
            cell.activate();
            console.log(" -> new state:%o", cell.state);
        });
    }
}

/**
 * @param {{col: number, row: number}} pos
 */
const createCellTd = (pos) => {
    const td = document.createElement('td');
    td.classList.add('game-cell')
    const input = document.createElement('input');
    input.type  = 'checkbox';
    input.value = '1';
    input.classList.add("game-cell__value");
    input.id = cellValueId(pos);
    input.dataset.row = pos.row;
    input.dataset.col = pos.col;
    td.appendChild(input);
    return td;
};

/**
 * @param {{col: number, row: number}} pos
 */
const cellValueId = (pos) => `#cellvalue-${pos.row}-${pos.col}`;