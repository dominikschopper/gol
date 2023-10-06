import { GolRulesClassic } from './gol-rules.mjs';

describe("the classic GOL ruleset", () => {
    describe("live cells dying", () => {
        test.each([
            { cellState: true, liveNeighbsCount: 4, expected: false },
            { cellState: true, liveNeighbsCount: 5, expected: false },
            { cellState: true, liveNeighbsCount: 6, expected: false },
            { cellState: true, liveNeighbsCount: 7, expected: false },
            { cellState: true, liveNeighbsCount: 8, expected: false },
            { cellState: true, liveNeighbsCount: 9, expected: false },
        ])(
            "overcrwoding: living cells with $liveNeighbsCount living neighbours will die",
            ({cellState, liveNeighbsCount, expected}) => {
                expect(GolRulesClassic.nextState(cellState, liveNeighbsCount)).toBe(expected);
            }
        );

        test.each([
            { cellState: true, liveNeighbsCount: 0, expected: false },
            { cellState: true, liveNeighbsCount: 1, expected: false },
        ])(
            "underpopulation: living cells with $liveNeighbsCount living neighbours will die",
            ({ cellState, liveNeighbsCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNeighbsCount)).toBe(expected);
            }
        );
    });

    describe("dead cells getting alive", () => {
        test.each([
            { cellState: false, liveNeighbsCount: 3, expected: true }
        ])(
            "creating life: dead cells with $liveNeighbsCount will be alive",
            ({ cellState, liveNeighbsCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNeighbsCount)).toBe(expected);
            }
        );
    });

    describe("dead cells staying dead", () => {
        test.each([
            { cellState: false, liveNeighbsCount: 0, expected: false },
            { cellState: false, liveNeighbsCount: 1, expected: false },
            { cellState: false, liveNeighbsCount: 2, expected: false },
            { cellState: false, liveNeighbsCount: 4, expected: false },
            { cellState: false, liveNeighbsCount: 5, expected: false },
            { cellState: false, liveNeighbsCount: 6, expected: false },
            { cellState: false, liveNeighbsCount: 7, expected: false },
            { cellState: false, liveNeighbsCount: 8, expected: false },
            { cellState: false, liveNeighbsCount: 9, expected: false },
        ])(
            "staying dead: dead cells with $liveNeighbsCount will stay dead",
            ({ cellState, liveNeighbsCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNeighbsCount)).toBe(expected);
            }
        );
    });
})