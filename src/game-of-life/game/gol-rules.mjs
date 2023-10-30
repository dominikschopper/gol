/**
 * @interface
 */
export class GolRules {
    /**
     * returns the state of a cell depending on its neighbours
     * @param {boolean} cellState
     * @param {number} livingNeighboursCount
     * @returns boolean
     */
    static nextState(cellState, livingNeighboursCount) {
        console.log("just an interface", cellState, livingNeighboursCount);
        return false;
    }
}

export class GolRulesClassic extends GolRules {
    static nextState(cellState, livingNeighboursCount) {
        if (cellState) {
            return this.#checkLivingCell(livingNeighboursCount);
        }
        return this.#checkDeadCell(livingNeighboursCount);
    }

    /**
     *
     * @param {number} livingNeighboursCount the number of neighbours that are alive
     * @returns boolean
     */
    static #checkLivingCell(livingNeighboursCount) {
        if (livingNeighboursCount < 2 || livingNeighboursCount > 3) {
            return false;
        }
        return true;
    }

    /**
     *
     * @param {number} livingNeighbours the number of neighbours that are alive
     * @returns boolean
     */
    static #checkDeadCell(livingNeighboursCount) {
        if (livingNeighboursCount === 3) {
            return true;
        }
        return false;
    }
}
