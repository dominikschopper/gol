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
        this.#element = document.querySelector(selector);
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
            if (cell.state === true) {
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
        this.#emptyRootElement();
        let currentRowId = -1;
        let tr;
        this.#game.forEveryCell((cell, pos) => {
            if (pos.row !== currentRowId) {
                tr = document.createElement('tr');
                this.#element.appendChild(tr);
                currentRowId = pos.row;
                this.#cells.push([]);
            }
            let td = createCellTd(pos, cell.state);
            tr.appendChild(td);
            this.#cells[pos.row][pos.col] = td
        });
        this.#setupCellClick();
        this.#initUpdate();
    }

    #emptyRootElement() {
        while (this.#element.firstChild) {
            this.#element.removeChild(this.#element.firstChild);
        }
    }

    #setupCellClick() {
        this.#element.addEventListener('change', ev => {
            const htmlCell = ev.target;
            const pos = {
                row: htmlCell.dataset.row,
                col: htmlCell.dataset.col
            };
            const cell = this.#game.cell(pos.row, pos.col);
            // clicks must set state and activate it directly
            cell.setState(!cell.state);
            cell.activate();
        });
    }
}

/**
 * @param {{col: number, row: number}} pos
 * @param {boolean} state
 */
const createCellTd = (pos, state) => {
    const td = document.createElement('td');
    td.classList.add('game-cell')
    const input = document.createElement('input');
    input.type  = 'checkbox';
    input.value = '1';
    input.checked = state == true ? true : false;
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