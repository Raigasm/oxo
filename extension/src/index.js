import Vue from "vue";
import OXO from "./oxo";
import "./oxo.scss";

console.log("hello world");

var game = OXO.newGame(0);

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You g loaded this page on " + new Date().toLocaleString(),
    game: game
  }
});
