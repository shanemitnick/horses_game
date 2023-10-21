/* eslint-disable no-undef */
const express = require('express');
const { key } = require('localforage');
const app = express();
const http = require('http').Server(app);
const { Server } = require("socket.io") ;

const io = new Server(http, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ["GET", "POST"]
  }
})

let dice1 = 1;
let dice2 = 1;
let deadHorses = [];
let players = {};
let cards = ["H2", "D2", "S2", "C2","H3", "D3", "S3", "C3", "H4", "D4", "S4", "C4","H5", "D5", "S5", "C5", "H6", "D6", "S6", "C6", "H7", "D7", "S7", "C7", "H8", "D8", "S8", "C8", "H9", "D9", "S9", "C9", "H10", "DT", "ST", "CT", "HJ", "DJ", "SJ", "CJ", "HQ", "DQ", "SQ", "Q"]


let gameView = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0
}

let goalScore = {
  2: 3,
  3: 6,
  4: 8,
  5: 11,
  6: 14,
  7: 17,
  8: 14,
  9: 11,
  10: 8,
  11: 6,
  12: 3
}

let moneyView = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0
}

function addPlayer(playerName) {
  players[playerName] = [];
}

function advanceGame(dice1, dice2) {
  let horseRolled = dice1 + dice2
  if(!deadHorses.includes(horseRolled)){
    gameView[horseRolled] = gameView[horseRolled] + 1;
  }else{
    moneyView[horseRolled] = moneyView[horseRolled] + (gameView[horseRolled] * -1);
  }

  return gameView;
}

function checkGameOver(){
  let winner = -1;
  Object.keys(gameView).map((key) => {
    if(gameView[key] === goalScore[key]){
      console.log("Winner Found!");
      // TODO: emit a winner here.
      return winner = key;
    }
  })

  if(winner >= 0){
    let winningPlayers = [];
    let playerNames = Object.keys(players);
    // loop through players cards, check if any cards contain the key
    // if they do, add them to the winners group, return winners group.
    playerNames.forEach((player) => {
      console.log(player);
      players[player].forEach((card) => {

        if(!( card == undefined ) && card.includes(winner) && !winningPlayers.includes(player)){
          winningPlayers.push(player);
        }
      })
    });

    return({card: winner, winningPlayers});
  }
  return(winner)
}

function killHorses(){
  // check if max dead horses recieved
  if(deadHorses.length >= 4){
    return deadHorses;
  }

  // draw card for horse & make sure not in list
  let card = Math.floor(Math.random() * 11) + 2;
  while(deadHorses.includes(card)){
    card = Math.floor(Math.random() * 11) + 2;
  }

  deadHorses.push(card);
  // add to chip count.
  moneyView[card] = deadHorses.length;
  // set horsePosition in gameView
  gameView[card] = deadHorses.length * -1;
  return deadHorses;
  
}

function rollDice(){
  dice1 = Math.floor(Math.random() * 6) + 1;
  dice2 = Math.floor(Math.random() * 6) + 1;

  advanceGame(dice1, dice2);

  return {dice1, dice2};
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function dealCards(){
  // get number of players
  let playerNames = Object.keys(players);
  // randomize cards
  let shuffledDeck = shuffle(cards.slice());
  // deal each card in the deck evenly

  while(shuffledDeck.length > 0){
    playerNames.forEach((player) => {
      players[player].push(shuffledDeck.pop());
    })
  }

  return players
}

let test = 1;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send(`${test}`);
  test++;
})

io.on("connection", (socket) => {
  // ...
  socket.join("game");
  console.log("Connection with: ", socket.id);

  socket.on("rollDice", () => {
    let {dice1, dice2} = rollDice();

    io.sockets.in('game').emit('rollDiceResult', {dice1, dice2, game: gameView, result: checkGameOver(), goalScore, moneyView, players});
  });

  socket.on("killHorse", () => {
    let newDeadHorses = killHorses();
    io.sockets.in('game').emit('killHorseResult', {newDeadHorses, gameView, goalScore, moneyView});
  });

  socket.on("resetGame", () => {
    gameView = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    }
    deadHorses = [];

    moneyView = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    }
  
    players = {

    }
    io.sockets.in('game').emit('resetGameResult', {deadHorses, gameView, moneyView, players});
  });

  socket.on("getGameView", () => {
    io.sockets.in("game").emit('gameViewResult', gameView);
  })

  socket.on("getMoneyView", () => {
    io.sockets.in("game").emit('moneyViewResult', moneyView);
  });

  socket.on("addPlayer", (arg) => {
    addPlayer(arg);
    console.log("player added");

    io.sockets.in("game").emit('addPlayerResult', players);
  });

  socket.on("dealCards", () => {
    console.log('dealing cards');
    let newPlayers = dealCards();
    io.sockets.in("game").emit('dealCardsResult', newPlayers)
  })

});

http.listen(5004, () => {console.log("server started on port 5004")});