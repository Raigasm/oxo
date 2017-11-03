import Vue from "vue";

console.log("hello world");

var root = new Vue({
  el: "#oxo-root",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString()
  }
});
