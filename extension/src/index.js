import Vue from "vue";
import OXO from "./oxo";
import "./oxo.scss";

console.log("hello world");

var game = {};

var state = {
  playing: false,
  won: {
    player: "N"
  }
};

var newGame = () => {
  game = OXO.createGame();
  game = OXO.newGame("X");
  state.playing = true;
};

newGame();

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString(),
    game: game,
    gameState: state
  },
  methods: {
    makeMove: cell => {
      console.log(cell);
    }
  }
});
