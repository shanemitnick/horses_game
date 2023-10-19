import { useState, useEffect } from "react"
import { Button, InputGroup, Form } from "react-bootstrap";
import BoardColumn from "../Components/boardColumn";
import io from 'socket.io-client';
import MoneyTable from "../Components/moneyTable";
const socket = io.connect('http://127.0.0.1:5004')

export default function Board(){

  let [test] = useState(0);
  let [dice1, setDice1] = useState(1);
  let [dice2, setDice2] = useState(1);
  let [deadHorses, setDeadHorses] = useState([]);
  let [moneyView, setMoneyView] = useState([]);
  let [players, setPlayers] = useState({});
  let [newPlayer, setNewPlayer] = useState("");

  // eslint-disable-next-line no-unused-vars
  let [goalScore, setGoalScore] = useState({});
  // eslint-disable-next-line no-unused-vars
  let [currentGame, setCurrentGame] = useState({});

  useEffect(() =>{ 
    socket.emit();
    socket.on("hello", (arg)=> {
      console.log("WOAH" , arg);
    })

    socket.on('rollDiceResult', (arg) => rollDice(arg));
    socket.on('killHorseResult', (arg) => killHorse(arg));
    socket.on('resetGameResult', (arg) => resetGame(arg));
    socket.on('gameViewResult', (arg) => getGameView(arg));
    socket.on('moneyViewResult', (arg) => getMoneyView(arg));
    socket.on('addPlayerResult', (arg) => addPlayer(arg));
  }, [dice1, dice2]);

  function getGameView(arg){
    console.log(arg);
  }

  function getMoneyView(arg){
    console.log("MONEY VIEW!", arg);
  }

  function rollDice(arg){
    console.log(arg);
    setDice1(arg.dice1);
    setDice2(arg.dice2);
    setGoalScore(arg.goalScore);
    setCurrentGame(arg.game);
    setMoneyView(arg.moneyView);
  }

  function killHorse(arg){
    setDeadHorses(arg.newDeadHorses);
    setCurrentGame(arg.gameView);
    setGoalScore(arg.goalScore);
    setMoneyView(arg.moneyView);
  }

  function resetGame(arg){
    console.log("REset game result", arg);
    setDice1(1);
    setDice2(1);
    setDeadHorses(arg.deadHorses);
    setCurrentGame(arg.gameView);
  }

  function addPlayer(arg){
    setPlayers(newPlayer);
  }

  let boardView = Object.keys(goalScore).map((horse) => {

    return(
      <div key={horse} id={horse}>
        <BoardColumn number={horse}
                      currentPos={currentGame[horse]}
                      deadPosition={currentGame[horse]}
                      goal={goalScore[horse]} />
      </div>
    )
  })

  function handleRollDice(){
    socket.emit("rollDice");
  }

  function handleKillHorse(){
    socket.emit('killHorse');
  }

  function handleResetGame(){
    socket.emit('resetGame');
  }

  function handleGetGameView(){
    socket.emit('getGameView');
  }

  function handleGetMoneyView(){
    socket.emit("getMoneyView");
  }

  function handleAddPlayer(){
    socket.emit("addPlayer", newPlayer);
  }

  return(
    <div>
      <h1 className="text-secondary">Welcome to the board. {test}</h1>
      <Button varient="dark" onClick={() =>  handleRollDice()}>Roll Dice</Button>
      <h2>{dice1}</h2>
      <h3>{dice2}</h3>
      <h3>{deadHorses}</h3>

      <Button onClick={() => handleGetGameView()}>Get Game View Test for Autocommit</Button>
      <Button onClick={() => handleKillHorse()}>Kill Horse</Button>
      <Button onClick={() => handleResetGame()}>Reset Game</Button>
      <Button onClick={() => handleGetMoneyView()}>Get Money View</Button>
      <Button onClick={() => {handleAddPlayer("shane")}}>Add Player</Button>
      <InputGroup className="mb-3 w-25 border mt-2">
          <Button variant="outline-secondary" onClick={() => handleAddPlayer()}>
            Add Player
          </Button>
          <Form.Control  onChange={(e) => setNewPlayer(e.target.value)}/>
      </InputGroup>
      <div className="d-flex">
        {boardView}
      </div>
      <div className="border border-white text-center" style={{width: "1650px"}}>FINISH</div>

      <div style={{width: "1650px"}}>
        <MoneyTable moneyView={moneyView}/>
      </div>
    </div>
  )
}