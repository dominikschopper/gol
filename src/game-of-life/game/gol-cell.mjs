export class GolCell {
    /** @property {boolean} */
    #life = false;

    /** @property {boolean} */
    #nextState = false;

    /** @property {GolCell[]} */
    #neighbours = [];

    /**
     * @property {GolGame}
     */
    #game = null;

    /**
     *
     * @param {GolGame} game the game this cell belongs to
     * @param {boolean} life (optional) the initial state of this cell
     */
    constructor(game, life) {
        this.#game = game;
        // weak checking on purpose
        this.#life = life == true;
    }

    /**
     * @property
     * @returns {boolean}
     */
    get state() {
        return this.#life;
    }

    /**
     * @property
     * @returns {number} the number of alive neighbours
     */
    get livingNeighbours() {
        return this.#neighbours.filter((n) => n.state === true).length;
    }

    /**
     * @method
     * @param {boolean} life
     */
    setState(sate) {
        this.#nextState = sate;
    }

    /**
     * @method
     */
    activate() {
        this.#life = this.#nextState;
    }

    /**
     * @method
     * @param {GolCell} n
     */
    addNeighbour(n) {
        // if (!this.#neighbours.find((c) => c === n)) {
        this.#neighbours.push(n);
        // }
    }

    nextState() {
        const nextState = this.#game.rules.nextState(this.state, this.livingNeighbours);
        this.setState(nextState);
    }
}
