# OXO.js

[live demo available here](http://rbutera.com/demos/oxo)

Tic-Tac-Toe browser game implemented in JavaScript (ES6) + [vue.js](https://vuejs.org/), packaged with [Webpack :heart:]()

## Installation and Testing Instructions

### Install & Run

A live mirror of this project [is available here](http://rbutera.com/demos/oxo)

If you want to try this on your local machine

1. clone this repo
2. `cd ./extension`
3. `npm install`
4. `npm run start`

A server will start at `localhost:8080`.

Press the **START BUTTON** to begin a game. Press it again to reset.

### Running Unit Tests

1. clone this repo
2. `npm install`
3. `npm run test`

## Why?

- Why not? JavaScript is fun! (I bet nobody said that with a straight face 10 years ago!)

## Why vue.js?

- DOM manipulation in JavaScript is a chore.
- I have experience with *AngularJS* and *React*, but never tried *Vue*
- Vue is gaining a lot of traction these days, so I wanted to see what all the fuss is about.
- Vue is supposed to be really light and minimal.

## Development Notes

- I ran into the issue of responding to user click events, and due to time constraints, I lazily modified the grid elements to POJOs with the format `{id:"a1", value: "N"}`.
- It would have been better to have used the component pattern when implementing the app ui.

