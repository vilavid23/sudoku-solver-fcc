solveSuduko(grid, row, col) {
    // create variable equal to 9
      const N = 9;
  // check IF row and col are equal to the end of their respective strings. RETURN the entire puzzle grid
      if (row == N - 1 && col == N) return grid;
  // check if only the column has reached the value of our variable up top. If it has, increase row by 1, set column once again to 0. 
      // this is how the solver 'goes' to the next array, and starts the process over. 
      if (col == N) {
        row++;
        col = 0;
      }
  // check IF the value at that coordinate no longer 0.
      // RETURN THIS very method, but with 1 ADDED to COLUMN. (dont forget the other (PERAMETERS))
      // this is how the solver 'goes' to the next number in a row. 
      if (grid[row][col] != 0) return this.solveSuduko(grid, row, col + 1);
  // create a LOOP, the initiator is equal to 1, it continues looping as long as its less than 10. 
  // for each loop, increase by 1.
      // inside loop = check IF THIS number isSafe to place at that square,
      // passing in the initiator from our loop. (dont forget the other (PARAMETERS))
          // inside IF = set the GRID at the ROW and COLUMN equal to the initiator from our loop. 
              // this is how the solver checks each number before it places it in the square. 
          // still inside IF, check IF this solve method with each parameters, and column plus 1 is true, if it is reutrn the grid.
            // i think this checks if column has been maxed out. idk how tho
      // leave the if, but back in our LOOP, add the initial state of GRID at ROW and COLUMN which is equal to 0.
  // RETURN FALSE to signify that all loops ran but none could finish. This will later help return the unsolvable message. 
              for (let num = 1; num < 10; num++) {
        if (this.isSafe(grid, row, col, num)) {
          grid[row][col] = num;
          if (this.solveSuduko(grid, row, col + 1)) return grid;
        }
  
        grid[row][col] = 0;
      }
      return false;
    }
  
    isSafe(grid, row, col, num) {
      // Check if we find the same num
      // in the similar row , we
      // return false
      // on line loop. start at 0 until less than or equal to 8. IF the grid at row of this value is euqal to num, RETURN FALSE. 
      for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;
  
      // Check if we find the same num
      // in the similar column ,
      // we return false
      // same as up top but with the column instead of row. 
      for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;
  
      // Check if we find the same num
      // in the particular 3*3
      // matrix, we return false
      // create variable for start and end cols and rows. coordinate is equal to itself, minus (itself and the REMAINDER of 3)
      // create LOOP FOR an initiator that adds one so long as its less than 3. 
      // create a second one for j. 
      // check IF the grid at first init PLUS the start row, and at second init PLUS the start col, is equal to num.
        // if true return false. 
      
      // return false at the end.  
      let startRow = row - (row % 3),
        startCol = col - (col % 3);
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (grid[i + startRow][j + startCol] == num) return false;
  
      return true;
    }
  
    transform(puzzleString) {
      // take ..53..23.23. => [[0,0,5,3,0,0,2,3,0],
      // [2,3,0]
      let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      // row starts at -1 and column starts at 0. LOOK UP WHY ROW? 
      let row = -1;
      let col = 0;
      // create a LOOP, starting at 0, as long as it is less than the puzzle string length, add one to the init. 
        // inside, IF the REMAINDER of the init and 9 is equal to 0, then row will add one to itself.
        // check the same for the column.  
      // outside IF but in LOOP, check the grid at the row and column and make it equal a terneray function. 
        // check if the puzzle string at the loop initiator is strictly equal to a period, if it is place a 0
          // if its not place a the puzzle string at that index (dont forget the + and the index [] at the end)
        // under that, have column add one to itself. 
      // outside of that return the grid.   
          for (let i = 0; i < puzzleString.length; i++) {
        if (i % 9 == 0) {
          row++;
        }
        if (col % 9 == 0) {
          col = 0;
        }
  
        grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
        col++;
      }
      return grid;
    }
  