const chai = require('chai');
const assert = chai.assert;
const puzzleString = require('../controllers/puzzle-strings.js').puzzlesAndSolutions
const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver;

suite('Unit Tests', () => {
    suite('Check input function', () => {
//Logic handles a valid puzzle string of 81 characters
        test('Valid puzzle string', (done) => {
            let input = puzzleString[0][1]
            assert.equal(solver.solve(input), input)
            done();
    })
//Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('Invalid puzzle characters', (done) => {
            let input = puzzleString[0][1].replace("1", "&");
            assert.equal(solver.validate(input), false);
            done();
    })
//Logic handles a puzzle string that is not 81 characters in length
        test('String that is not 81 characters', (done) => {
            let input = '1111'; 
            assert.equal(solver.solve(input), false);
            done();
    })
})
    suite('Function checkRowPlacement()', () => {
//Logic handles a valid row placement
        test('Valid row placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'A'; 
            let column = 2; 
            let value = 3;
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), true);
            done();
    })
 //logic handles an invalid row placement
        test('Invalid row placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'B'; 
            let column = 2; 
            let value = 6;
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), false)
            done();
    })
})
    suite('Function checkColumnPlacement()', () => {
//Logic handles a valid column placement
        test('Valid column placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'C'; 
            let column = 3; 
            let value = 8;
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), true);
            done();
        })
//Logic handles an invalid column placement
        test('Invalid column placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'H'; 
            let column = 2; 
            let value = 3;
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), false);
            done();
        })
    })
    suite('Function checkRegionPlacement()', () => {
//Logic handles a valid region (3x3 grid) placement
        test('Valid region (3x3 grid) placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'B'; 
            let column = 5; 
            let value = 8;
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), true)
            done();
        })
//Logic handles an invalid region (3x3 grid) placement
        test('Invalid region placement', (done) => {
            let puzzle = puzzleString[0][1];
            let row = 'F';
            let column = 8; 
            let value = 3; 
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), false);
            done();
        })
    })
    suite('Function solve()', () => {
//Valid puzzle strings pass the solver
        test('Valid puzzle string passes the solver', (done) => {
            let puzString = puzzleString[0][1]
            assert.equal(solver.solve(puzString), puzString);
            done();
        })
//Invalid puzzle strings fail the solver
        test('Invalid puzzle string fails the solver', (done) => {
            let puzString = '111...222111...222111...222111...222111...222111...222111...222111...222111...222'
            assert.equal(solver.solve(puzString), false);
            done();
        })
//Solver returns the expected solution for an incomplete puzzle
        test('Incomplete puzzle', (done) => {
            let puzString = puzzleString[1][1]
            assert.equal(solver.solve(puzString), puzString);
            done();
        })
    })
});
