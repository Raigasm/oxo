import Vue from "vue";
import OXO from "./oxo";
import "./oxo.scss";

console.log("hello world");

var state = {
  playing: false,
  won: false,
  wonBy: "N",
  draw: false,
  game: {}
};

var newGame = () => {
  state.game = OXO.newGame(OXO.createGame(), "X");
  state.playing = true;
  state.won = false;
  state.wonBy = "N";
  state.draw = false;
  console.log("new game started");
};

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString(),
    gameState: state
  },
  methods: {
    makeMove: cell => {
      // console.log(cell);
      // console.log(`makeMove: ${cell.id}`);
      if (OXO.valid(state.game, cell.id) == "OK") {
        state.game = OXO.move(state.game, OXO.row(cell.id), OXO.col(cell.id));
        state.wonBy = OXO.won(state.game);
        state.draw = OXO.drawn(state.game);

        if (state.wonBy != "N") {
          state.won = true;
          alert(`${state.wonBy} won`);
        } else if (state.draw) {
          alert("It's a draw!");
        } else {
          console.log("continue playing");
        }
        console.log("state: " + state);
      } else {
        alert("bad!");
      }
    },
    startGame: () => {
      console.log("trying to start a new game");
      newGame();
    }
  },
  computed: {
    startButtonLabel: function () {
      if(this.gameState.playing) {
        return "RESET";
      } else {
        return "PLAY!";
      }
    }
  }
});
