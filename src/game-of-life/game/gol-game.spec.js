import { GolGame } from './gol-game.mjs';
import { GolCell } from './gol-cell.mjs';

describe("the GolGame class", () => {
    let game3x3;
    let game5x7;
    let game7x4;

    const golRulesMock = {
        nextState: () => true
    };

    beforeEach(() => {
        game3x3 = new GolGame(golRulesMock, 3, 3);
        game5x7 = new GolGame(golRulesMock, 5, 7);
        game7x4 = new GolGame(golRulesMock, 7, 4);
    });

    describe("the game should create the correct number of rows/cols", () => {
        test.each([
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 2, col: 2 },
        ])("the game3x3 should return the cell instance for $row / $col", ({row, col}) => {
            const cell = game3x3.cell(row, col);
            expect(cell).toBeTruthy();
            expect(cell instanceof GolCell).toBe(true);
        });

        test.each([
            { row: -1, col: -2 },
            { row: 4, col: 5 },
            { row: 3, col: 3 },
        ])("the game3x3 should throw for $row / $col", ({ row, col }) => {
            expect(() => game3x3.cell(row, col)).toThrow();
        });

        test.each([
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 3, col: 1 },
            { row: 4, col: 6 },
            { row: 4, col: 6 },
        ])("the game5x7 should return the cell instance for $row / $col", ({ row, col }) => {
            const cell = game5x7.cell(row, col);
            expect(cell).toBeTruthy();
            expect(cell instanceof GolCell).toBe(true);
        });

        test.each([
            { row: -1, col: -2 },
            { row: 4, col: 10 },
            { row: 5, col: 7 },
        ])("the game5x7 should throw for $row / $col", ({ row, col }) => {
            expect(() => game5x7.cell(row, col)).toThrow();
        });
    });

    describe("method nextState() sets the new state on the cells", () => {
        it("should have false as state initially", () => {
            expect(game7x4.cell(0, 0).state).toBe(false);
            expect(game7x4.cell(4, 2).state).toBe(false);
            expect(game7x4.cell(6, 3).state).toBe(false);
        });

        it("should have a true state for all cells after calling nextState() with our ruleMock", () => {
            game7x4.nextState();

            expect(game7x4.cell(0, 0).state).toBe(true);
            expect(game7x4.cell(4, 2).state).toBe(true);
            expect(game7x4.cell(6, 3).state).toBe(true);
        });
    });

    describe("the forEveryCell() method", () => {
        const cbMock = jest.fn((cell, pos) => {
            console.log('>>>>> cell:%o / pos:%o', cell, pos);
        });

        it('should call the callback for every cell', () => {
            game3x3.forEveryCell(cbMock);
            expect(cbMock).toHaveBeenCalledTimes(9);
        });

    });

    describe("the addNextStateCallback() method", () => {
        it("should call the given method for once each cell", () => {
            const mockCb3x3 = jest.fn(a => a);
            const mockCb7x4 = jest.fn(a => a);
            game3x3.addNextStateCallback(mockCb3x3);
            game3x3.nextState();

            expect(mockCb3x3).toHaveBeenCalledTimes(3 * 3);

            game7x4.addNextStateCallback(mockCb7x4);
            game7x4.nextState();
            expect(mockCb7x4).toHaveBeenCalledTimes(7 * 4);
        });
    });
});