import _ from "lodash";

const freshGame = {
  grid: [
    [
      { id: "a1", value: "N" },
      { id: "a2", value: "N" },
      { id: "a3", value: "N" }
    ],
    [
      { id: "b1", value: "N" },
      { id: "b2", value: "N" },
      { id: "b3", value: "N" }
    ],
    [
      { id: "c1", value: "N" },
      { id: "c2", value: "N" },
      { id: "c3", value: "N" }
    ]
  ],
  next: "X",
  moves: -1
};

function exists(input) {
  return !_.isUndefined(input) && !_.isNull(input);
}

var OXO = {};

OXO.createGame = (grid, next, moves) => {
  let result = _.cloneDeep(freshGame);
  if (exists(grid) && _.isArray(grid)) {
    result.grid = grid;
  }
  if (exists(next)) {
    result.next = next;
  }
  if (exists(moves)) {
    result.moves = moves;
  }

  return result;
};

OXO.newGame = (game, player) => {
  game = OXO.createGame(game, player, 0);
  game.next = player;
  return game;
};

function row(text) {
  let input = text[0];
  switch (input) {
    case "a":
      return 0;
    case "b":
      return 1;
    case "c":
      return 2;
    default:
      return -1;
  }
}
OXO.row = row;

// Convert the digit in a valid move string such as "b2" functiono a column index.
function col(text) {
  let input = text[1];
  switch (input) {
    case "1":
      return 0;
    case "2":
      return 1;
    case "3":
      return 2;
    default:
      return -1;
  }
}
OXO.col = col;

// Check whether a move string typed in by the user such as "b2" is valid, and
// the corresponding cell is available.  Return a validity code.
function valid(g, text) {
  let testRow = row(text);
  let testCol = col(text);
  let isValid = true;

  if (text.length < 2 || text.length > 2) {
    isValid = false;
    return "BadFormat";
  }

  if (testRow == -1) {
    isValid = false;
    return "BadLetter";
  }

  if (isValid && testCol == -1) {
    isValid = false;
    return "BadDigit";
  }

  if (isValid && g.grid[testRow][testCol].value != "N") {
    isValid = false;
    return "BadCell";
  }

  if (isValid) {
    return "OK";
  } else {
    return "Unchecked";
  }
}
OXO.valid = valid;

function setPosition(g, row, col, newValue) {
  console.log(`setPosition: ${row},${col} -> ${newValue}`);
  console.log(g);
  g.grid[row][col].value = newValue;
  return g;
}

function move(g, r, c) {
  g = setPosition(g, r, c, g.next);
  if (g.next == "X") {
    g.next = "O";
  } else if (g.next == "O") {
    g.next = "X";
  }
  g.moves++;

  return g;
}

OXO.move = move;

function winningLine(x, y, z) {
  if (x == y && y == z && x != "N") {
    return true;
  } else {
    return false;
  }
}

// Check if the given line is a winning one, and return the winning player.
function line(x, y, z) {
  if (x == y && y == z && x != "N") {
    return x;
  } else {
    return "N";
  }
}

OXO.line = line;

function lastPlayer(g) {
  let current = g.next;
  let last;
  switch (current) {
    case "X":
      last = "O";
      break;
    case "O":
      last = "X";
      break;
    default:
      last = "N";
      break;
  }
  return last;
}

function checkHorizontalWins(b) {
  let winFound = false;
  for (let x = 0; x < 3; x++) {
    let result = winningLine(
      b.grid[x][0].value,
      b.grid[x][1].value,
      b.grid[x][2].value
    );
    if (result) {
      winFound = true;
    }
  }
  return winFound;
}

function checkVerticalWins(b) {
  let winFound = false;
  for (let x = 0; x < 3; x++) {
    let result = winningLine(
      b.grid[0][x].value,
      b.grid[1][x].value,
      b.grid[2][x].value
    );
    if (result) {
      winFound = true;
    }
  }
  return winFound;
}

function checkDiagonalWins(b) {
  let topLeft, topRight, centre, bottomLeft, bottomRight;
  topLeft = b.grid[0][0].value;
  topRight = b.grid[0][2].value;
  bottomLeft = b.grid[2][0].value;
  bottomRight = b.grid[2][2].value;
  centre = b.grid[1][1].value;

  if (winningLine(topLeft, centre, bottomRight)) {
    return true;
  } else if (winningLine(topRight, centre, bottomLeft)) {
    return true;
  } else {
    return false;
  }
}

function checkForWins(b) {
  let hasWon =
    checkHorizontalWins(b) || checkVerticalWins(b) || checkDiagonalWins(b);
  return hasWon;
}

function won(g) {
  let result = checkForWins(g);
  let playa = lastPlayer(g);
  if (result) {
    return playa;
  } else {
    return "N";
  }
}

OXO.won = won;

function drawn(g) {
  let boardNotWon = !checkForWins(g);
  return boardNotWon && g.moves == 9;
}
OXO.drawn = drawn;

module.exports = OXO;
