import _ from "lodash";

const freshGame = {
  grid: [["N", "N", "N"], ["N", "N", "N"], ["N", "N", "N"]],
  next: "N",
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

  if (isValid && g.grid[testRow][testCol] != "N") {
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
  g.grid[row][col] = newValue;
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

function line(x, y, z) {}

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

module.exports = OXO;
