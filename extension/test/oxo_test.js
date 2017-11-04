/*eslint-env node*/
const OXO = require("../src/oxo");
const assert = require("assert"); // core module

describe("OXO", () => {
  describe("Module", () => {
    it("should exist", () => {
      assert.equal(typeof OXO, "object");
    });

    // Test initialization of the game (tests 1 to 8)
    it("be able to create new games", () => {
      let g = OXO.createGame(
        [
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
            { id: "c3", value: "N" },
            { id: "c3", value: "N" }
          ]
        ],
        "N",
        -1
      );
      assert.equal(typeof OXO.newGame, "function");
      g = OXO.newGame(g, "X");
      assert.equal(g.grid[0][0].value, "N");
      assert.equal(g.grid[1][1].value, "N");
      assert.equal(g.grid[2][2].value, "N");
      assert.equal(g.grid[0][2].value, "N");
      assert.equal(g.grid[2][1].value, "N");
      assert.equal(g.next, "X");
      assert.equal(g.moves, 0);
      g = OXO.newGame(g, "O");
      assert.equal(g.next, "O");
    });

    // Test that the row/col functions give the right answers (tests 9 to 14)
    it("have working row and col methods", () => {
      assert.equal(typeof OXO.row, "function");
      assert.equal(typeof OXO.col, "function");
      assert.equal(OXO.row("a3"), 0);
      assert.equal(OXO.row("b2"), 1);
      assert.equal(OXO.row("c2"), 2);
      assert.equal(OXO.col("b1"), 0);
      assert.equal(OXO.col("b2"), 1);
      assert.equal(OXO.col("a3"), 2);
    });

    // Test invalid input, or trying to play in an occupied cell (tests 15 to 22)
    it("have a working valid function", () => {
      let g = OXO.createGame();
      assert.equal(typeof OXO.valid, "function");
      assert.equal(OXO.valid(g, "d2"), "BadLetter");
      assert.equal(OXO.valid(g, "b0"), "BadDigit");
      assert.equal(OXO.valid(g, "b4"), "BadDigit");
      assert.equal(OXO.valid(g, "2b"), "BadLetter");
      assert.equal(OXO.valid(g, "b2x"), "BadFormat");
      assert.equal(OXO.valid(g, "b"), "BadFormat");
      assert.equal(OXO.valid(g, ""), "BadFormat");
      // *g = (game){{{N, N, N}, {N, N, N}, {N, X, N}}, O, 1};
      g = OXO.createGame(
        [
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
            { id: "c3", value: "X" },
            { id: "c3", value: "N" }
          ]
        ],
        "O",
        1
      );
      assert.equal(OXO.valid(g, "c2"), "BadCell");
    });

    // Test making a move (tests 23 to 28)
    it("have a move method for executing player moves", () => {
      assert.equal(typeof OXO.move, "function");
      let g = OXO.createGame();
      g = OXO.newGame(g, "X");
      g = OXO.move(g, OXO.row("b2"), OXO.col("b2"));
      assert.equal(g.grid[1][1].value, "X");
      assert.equal(g.next, "O");
      assert.equal(g.moves, 1);
      g = OXO.move(g, OXO.row("a3"), OXO.col("a3"));
      assert.equal(g.grid[0][2].value, "O");
      assert.equal(g.next, "X");
      assert.equal(g.moves, 2);
    });

    // Test the line function (tests 29 to 36)
    it("have a line method for detecting winning lines", () => {
      assert.equal(typeof OXO.line, "function");
      assert.equal(OXO.line("X", "X", "X"), "X");
      assert.equal(OXO.line("O", "O", "O"), "O");
      assert.equal(OXO.line("X", "O", "O"), "N");
      assert.equal(OXO.line("O", "X", "O"), "N");
      assert.equal(OXO.line("O", "O", "X"), "N");
      assert.equal(OXO.line("N", "N", "N"), "N");
      assert.equal(OXO.line("X", "N", "N"), "N");
      assert.equal(OXO.line("O", "O", "N"), "N");
    });

    // Test winning lines (tests 37 to 44)
    it("have a won method for detecting wins", () => {
      assert.equal(typeof OXO.won, "function");
      let g;
      // *g = (game){{{X, X, X}, {N, O, N}, {N, O, N}}, O, 5};
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "X" },
            { id: "a2", value: "X" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "N" },
            { id: "b2", value: "O" },
            { id: "b3", value: "N" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "O" },
            { id: "c3", value: "N" }
          ]
        ],
        "O",
        5
      );

      assert.equal(OXO.won(g), "X");
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "N" },
            { id: "a2", value: "O" },
            { id: "a3", value: "N" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "X" },
            { id: "b3", value: "X" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "O" },
            { id: "c3", value: "N" }
          ]
        ],
        "O",
        5
      );
      assert.equal(OXO.won(g), "X");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "N" },
            { id: "a2", value: "O" },
            { id: "a3", value: "N" }
          ],
          [
            { id: "b1", value: "N" },
            { id: "b2", value: "O" },
            { id: "b3", value: "N" }
          ],
          [
            { id: "c1", value: "X" },
            { id: "c3", value: "X" },
            { id: "c3", value: "X" }
          ]
        ],
        "O",
        5
      );

      assert.equal(OXO.won(g), "X");
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "O" },
            { id: "a2", value: "N" },
            { id: "a3", value: "N" }
          ],
          [
            { id: "b1", value: "O" },
            { id: "b2", value: "X" },
            { id: "b3", value: "N" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "N" },
            { id: "c3", value: "X" }
          ]
        ],
        "X",
        5
      );
      assert.equal(OXO.won(g), "O");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "N" },
            { id: "a2", value: "O" },
            { id: "a3", value: "N" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "O" },
            { id: "b3", value: "N" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "O" },
            { id: "c3", value: "X" }
          ]
        ],
        "X",
        5
      );

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "N" },
            { id: "a2", value: "O" },
            { id: "a3", value: "N" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "O" },
            { id: "b3", value: "N" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "O" },
            { id: "c3", value: "X" }
          ]
        ],
        "X",
        5
      );
      assert.equal(OXO.won(g), "O");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "N" },
            { id: "a2", value: "N" },
            { id: "a3", value: "O" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "N" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "N" },
            { id: "c3", value: "O" }
          ]
        ],
        "X",
        5
      );
      assert.equal(OXO.won(g), "O");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "X" },
            { id: "a2", value: "N" },
            { id: "a3", value: "O" }
          ],
          [
            { id: "b1", value: "N" },
            { id: "b2", value: "X" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "N" },
            { id: "c3", value: "N" },
            { id: "c3", value: "X" }
          ]
        ],
        "O",
        5
      );
      assert.equal(OXO.won(g), "X");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "X" },
            { id: "a2", value: "N" },
            { id: "a3", value: "O" }
          ],
          [
            { id: "b1", value: "N" },
            { id: "b2", value: "O" },
            { id: "b3", value: "X" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "N" },
            { id: "c3", value: "N" }
          ]
        ],
        "X",
        5
      );
      assert.equal(OXO.won(g), "O");
    });

    // Test no winning line (tests 45 to 48)
    it("should be able to detect if there are no wins yet", () => {
      let g;

      g = OXO.createGame(
        [
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
            { id: "c3", value: "N" },
            { id: "c3", value: "N" }
          ]
        ],
        "X",
        0
      );

      assert.equal(OXO.won(g), "N");

      g = OXO.createGame(
        [
          [
            { id: "a1", value: "O" },
            { id: "a2", value: "N" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "X" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "X" },
            { id: "c3", value: "N" }
          ]
        ],
        "O",
        7
      );
      assert.equal(OXO.won(g), "N");
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "X" },
            { id: "a2", value: "O" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "O" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "X" },
            { id: "c3", value: "O" }
          ]
        ],
        "X",
        9
      );

      assert.equal(OXO.won(g), "N");
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "O" },
            { id: "a2", value: "O" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "X" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "X" },
            { id: "c3", value: "X" }
          ]
        ],
        "O",
        9
      );
      assert.equal(OXO.won(g), "N");
    });

    // Test drawn games (tests 49 to 50)
    it("should have a valid drawn method for determining draws", () => {
      let g;
      assert.equal(typeof OXO.drawn, "function");
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "O" },
            { id: "a2", value: "N" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "X" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "X" },
            { id: "c3", value: "N" }
          ]
        ],
        "O",
        7
      );
      assert.equal(OXO.drawn(g), false);
      g = OXO.createGame(
        [
          [
            { id: "a1", value: "O" },
            { id: "a2", value: "O" },
            { id: "a3", value: "X" }
          ],
          [
            { id: "b1", value: "X" },
            { id: "b2", value: "X" },
            { id: "b3", value: "O" }
          ],
          [
            { id: "c1", value: "O" },
            { id: "c3", value: "X" },
            { id: "c3", value: "X" }
          ]
        ],
        "O",
        9
      );
      assert.equal(OXO.drawn(g), true);
    });
  });
});
