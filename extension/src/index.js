import Vue from "vue";
import OXO from "./oxo";
import "./oxo.scss";

console.log("hello world");

var game = {};

var state = {
  playing: false
};

var newGame = () => {
  game = OXO.createGame();
  game = OXO.newGame("X");
  state.playing = true;
};

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString(),
    game: game,
    gameState: state
  }
});
