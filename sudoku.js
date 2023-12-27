const sudokuGrid = document.querySelector('.sudoku-grid');
const solveButton = document.getElementById('solve-button');

// Create the Sudoku grid
const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Generate the Sudoku grid cells
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const cell = document.createElement('input');
    cell.classList.add('sudoku-cell');
    cell.type = 'number';
    cell.min = 1;
    cell.max = 9;
    cell.value = '';
    sudokuGrid.appendChild(cell);
  }
}

// Convert the input values to the grid
function updateGrid() {
  const cells = document.querySelectorAll('.sudoku-cell');
  for (let i = 0; i < cells.length; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    grid[row][col] = parseInt(cells[i].value) || 0;
  }
}

// Convert the grid values to the input fields
function updateInputFields() {
  const cells = document.querySelectorAll('.sudoku-cell');
  for (let i = 0; i < cells.length; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    cells[i].value = grid[row][col] || '';
  }
}

// Check if a value can be placed in a particular cell
function isValid(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (grid[i][j] === num) {
        return false;
      }
    }
  }
  return true;
}

// Solve the Sudoku puzzle using backtracking
function solveSudoku() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku()) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Add event listener to the "Solve" button
solveButton.addEventListener('click', () => {
  updateGrid();
  if (solveSudoku()) {
    updateInputFields();
  } else {
    alert("No solution exists for the given puzzle.");
  }
});
