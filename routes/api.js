'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
  
    let {puzzle, coordinate, value} = req.body
    if ( !puzzle || !coordinate || !value) {
      res.json({error: 'Required field(s) missing'})
    }
    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
    }
    let valid = solver.validate(puzzle)
    if (!valid){
      return res.json({ error: 'Invalid characters in puzzle' })
    }
    const row = coordinate.split("")[0];
    const column = coordinate.split("")[1];
    if(coordinate.length !== 2 || !/[A-I]/i.test(row) || !/[1-9]/i.test(column)){
      res.json({error: 'Invalid coordinate'})
    } 
    if(value.length > 1 || !/[1-9]/i.test(value)){
      res.json({error: 'Invalid value'})
    }

    let validCol = solver.checkColPlacement(puzzle, row, column, value);
    let validReg = solver.checkRegionPlacement(puzzle, row, column, value);
    let validRow = solver.checkRowPlacement(puzzle, row, column, value);
    let conflicts = [];
    if(validCol && validReg && validRow){
      return res.json({ valid: true })
    } else {
      if(!validCol){
        conflicts.push("column")
      }
      if(!validReg){
        conflicts.push("region")
      }
      if(!validRow){
        conflicts.push("row")
      }
      return res.json({valid: false, conflict: conflicts})
    }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle
      if (!puzzle) {
        return res.json({error: 'Required field missing'})
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      const valid = solver.validate(puzzle);
      if(!valid) {
        return res.json({ error: 'Invalid characters in puzzle' })
      } 
      const solve = solver.solve(puzzle);
      if (!solve) {
        return res.json({ error: 'Puzzle cannot be solved' })
      }
      
      res.json({solution: solve})
    });
};
