import { collectCoverage } from '../../../jest.config';
import { GolCell } from "./gol-cell.mjs";

describe("GolCell", () => {
    let aliveCell;
    let deadCell;
    let aliveWith2Live;
    let deadWith3Live;

    const gameMock = {};

    beforeEach(() => {
        aliveCell = new GolCell(gameMock, true);
        deadCell = new GolCell(gameMock, );

        aliveWith2Live = new GolCell(gameMock, true);
        aliveWith2Live.addNeighbour(new GolCell(gameMock, true));
        aliveWith2Live.addNeighbour(new GolCell(gameMock, true));

        deadWith3Live = new GolCell(gameMock, );
        deadWith3Live.addNeighbour(new GolCell(gameMock, true));
        deadWith3Live.addNeighbour(new GolCell(gameMock, true));
        deadWith3Live.addNeighbour(new GolCell(gameMock, true));
    });

    describe("the state method", () => {
        it("should return true for living and false for dead cells", () => {
            expect(aliveCell.state).toBe(true);
            expect(aliveWith2Live.state).toBe(true);
            expect(deadCell.state).toBe(false);
            expect(deadWith3Live.state).toBe(false);
        });
    });

    describe("the setState() and activate()methods", () => {
        it("should set the next state and not the current one", () => {
            expect(deadCell.state).toBe(false);
            deadCell.setState(true);
            expect(deadCell.state).toBe(false);
            deadCell.activate();
            expect(deadCell.state).toBe(true);

            expect(aliveCell.state).toBe(true);
            aliveCell.setState(false);
            expect(aliveCell.state).toBe(true);
            aliveCell.activate();
            expect(aliveCell.state).toBe(false);
        });
    });

    describe("the addNeighbour() method", () => {
        it("should add neighbour cells references", () => {
            expect(aliveCell.livingNeighbours).toBe(0);
            expect(aliveWith2Live.livingNeighbours).toBe(2);
            expect(deadCell.livingNeighbours).toBe(0);
            expect(deadWith3Live.livingNeighbours).toBe(3);
        });
    });
});
