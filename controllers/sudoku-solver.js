
const puzString = require('../controllers/puzzle-strings.js').puzzlesAndSolutions

class SudokuSolver {
  
  validate(puzzleString) {
    //test if all values in string are numbers, letters, or a period. 
   
    return Boolean(puzzleString.match(/^[0-9.]*$/))
  }
  convertCoord(row){
    switch(row.toUpperCase()){
      case 'A':
      return 1;
      
      case 'B':
      return 2;
    
      case 'C':
      return 3;
   
      case 'D':
      return 4;
    
      case 'E':
      return 5;

      case 'F':
      return 6;
 
      case 'G':
      return 7;

      case 'H':
      return 8;
  
      case 'I':
      return 9;
     
      default: 
      return 'none';
    }
  }
  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.convertCoord(row);
    if (grid[row - 1][column - 1] == value) {
      return true;
    }
    if (grid[row - 1][column - 1] !== 0) {
      return false;
    }
    
    for (let i = 0; i <= 8; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

checkColPlacement(puzzleString, row, column, value) {
  let grid = this.transform(puzzleString);
  row = this.convertCoord(row);
  if (grid[row - 1][column - 1] == value) {
    return true;
  }
  if (grid[row - 1][column - 1] !== 0) {
    return false;
  }
  for (let i = 0; i <= 8; i++) {
    if (grid[i][column - 1] == value) {
      return false;
    }
  }
  return true;
}
  

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.convertCoord(row);
    if (grid[row - 1][column - 1] == value) {
      return true;
    }
    let startRow = row - (row % 3), 
        startCol = column - (column % 3); 

    for(let i = 0; i <= 2; i++)
      for(let j = 0; j <= 2; j++)
        if(grid[i + startRow][j + startCol] == value){
          return false
        }
        return true;
  }
  solveSuduko(grid, row, col) {
    const limit = 9; 

    if(row == limit - 1 && col == limit) return grid;
    
    if(col == limit){
      row++
      col=0
    }

    if(grid[row][col] !== 0) return this.solveSuduko(grid, row, col + 1);

    for(let num = 1; num <= 9; num++){
      
      if(this.isSafe(grid, row, col, num)){
        grid[row][col] = num;
        if(this.solveSuduko(grid, row, col + 1)) return grid
      }
      grid[row][col] = 0
    }
    return false
  }   
     
  isSafe(grid, row, col, num){
  for(let x = 0; x <= 8; x++) if(grid[row][x] == num) return false;

  for (let y = 0; y <=8; y++) if(grid[y][col] == num) return false; 

  let rowStart = row - (row % 3), 
      colStart = col - (col % 3);
  for(let i = 0; i <= 2; i++)
    for(let j = 0; j <= 2; j++)
  if(grid[i + rowStart][j + colStart] == num) return false;
  return true
}
     
  transform(puzzleString) {
    let grid = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
    let row = -1; 
    let col = 0;

    for(let i = 0; i < puzzleString.length; i++){
      if (i % 9 == 0){
        row++;
      } 
      if(col % 9 == 0){
        col=0
      }
      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++
    }
    return grid
  }

  transformBack(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    let grid = this.transform(puzzleString);
    // send the grid with the initial row and col values to the sudoku.
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) {
      return false;
    }
    let solvedString = this.transformBack(solved);
    
    return solvedString;
  }

}

module.exports = SudokuSolver;

