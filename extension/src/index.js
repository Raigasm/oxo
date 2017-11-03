import Vue from "vue";
import Oxo from "./oxo";
import "./oxo.scss";

console.log("hello world");

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString(),
    game: Oxo
  }
});
