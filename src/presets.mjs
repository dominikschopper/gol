// some simple forms as presets
const spinner3RowCfg = [
    { row: 0, col: -1 },
    { row: 0, col: 0 },
    { row: 0, col: 1 },
];

const spinner3ColCfg = [
    { row: -1, col: 0 },
    { row: 0, col: 0 },
    { row: 1, col: 0 }
];

const smallGliderLeft = [
    {row: 0, col: 0},
    {row: 0, col: 1},
    {row: 0, col: 2},
    {row: 1, col: 2},
    {row: 2, col: 1}
];

const smallGliderRight = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 0 },
    { row: 2, col: 1 },
];

const staticSquareCfg = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
];

const staticRingCfg = [
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 0 },
    { row: 1, col: 3 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
]

/**
 * @param {Array<{row: number, col: number}>} livePointsRel
 * @returns {(topLeftPos, board) => void}
*/
const createForm = (livePointsRel) => {
    /**
     * @param {{row: number, col: number}} topLeftPos
     * @param {GolGame} board
     */
    return (topLeftPos, board) => {
        livePointsRel.forEach((relPos) => {
            const row = relPos.row + topLeftPos.row;
            const col = relPos.col + topLeftPos.col;
            /** @type GolCell */
            const cell = board.cell(row, col);
            cell.setState(true);
            cell.activate();
        });
    };
};

export const createSpinner3 = createForm(spinner3RowCfg);
export const createSpinner3Vertical = createForm(spinner3ColCfg);
export const createGliderLeft = createForm(smallGliderLeft);
export const createGliderRight = createForm(smallGliderRight);
export const createStaticRing = createForm(staticRingCfg);
export const createStaticSquare = createForm(staticSquareCfg);
