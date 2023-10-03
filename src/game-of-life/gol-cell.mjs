export class GolCell {
    /** @type {boolean} */
    _life = false;

    /** @type {boolean} */
    _nextLife = false;

    /** @type {GolCell[]} */
    _neighbours = [];

    /**
     * @param {boolean} life optional parameter
     */
    constructor(life) {
        this._life = life == true;
    }

    /**
     * @property
     * @returns {boolean}
     */
    get state() {
        return this._life;
    }

    /**
     * @property
     * @returns {number} the number of alive neighbours
     */
    get livingNeighbours() {
        return this._neighbours.filter((n) => n.state === true).length;
    }

    /**
     * @method
     * @param {boolean} life
     */
    setLife(life) {
        this._nextLife = life;
    }

    /**
     * @method
     */
    activate() {
        this._life = this._nextLife;
    }

    /**
     * @method
     * @param {GolCell} n
     */
    addNeighbour(n) {
        if (!this._neighbours.find((c) => c === n)) {
            this._neighbours.push(n);
        }
    }
}
