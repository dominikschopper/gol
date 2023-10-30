import { GolRulesClassic } from './gol-rules.mjs';

describe("the classic GOL ruleset", () => {
    describe("live cells dying", () => {
        test.each([
            { cellState: true, liveNCount: 4, expected: false },
            { cellState: true, liveNCount: 5, expected: false },
            { cellState: true, liveNCount: 6, expected: false },
            { cellState: true, liveNCount: 7, expected: false },
            { cellState: true, liveNCount: 8, expected: false },
            { cellState: true, liveNCount: 9, expected: false },
        ])(
            "overcrwoding: living cells with $liveNCount living neighbours will die",
            ({cellState, liveNCount, expected}) => {
                expect(GolRulesClassic.nextState(cellState, liveNCount)).toBe(expected);
            }
        );

        test.each([
            { cellState: true, liveNCount: 0, expected: false },
            { cellState: true, liveNCount: 1, expected: false },
        ])(
            "underpopulation: living cells with $liveNCount living neighbours will die",
            ({ cellState, liveNCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNCount)).toBe(expected);
            }
        );
    });

    describe("dead cells getting alive", () => {
        test.each([
            { cellState: false, liveNCount: 3, expected: true }
        ])(
            "creating life: dead cells with $liveNCount will be alive",
            ({ cellState, liveNCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNCount)).toBe(expected);
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

    describe("live cells staying alive", () => {
        test.each([
            { cellState: true, liveNCount: 2, expected: true },
            { cellState: true, liveNCount: 3, expected: true },
        ])(
            "underpopulation: living cells with $liveNCount living neighbours will die",
            ({ cellState, liveNCount, expected }) => {
                expect(GolRulesClassic.nextState(cellState, liveNCount)).toBe(expected);
            }
        );
    });
})