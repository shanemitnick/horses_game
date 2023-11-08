import { Container } from "react-bootstrap";
import BoardTiles from "./boardTiles";
import DiceDisplay from "./diceDisplay";


export default function BoardContainer(props){

    return (
        <div className="d-flex flex-row m-5">
            <BoardTiles goalScore={props.goalScore}
                        currentGame={props.currentGame}
                        winningHorse={props.winningHorse}
            />
            <DiceDisplay dice1={props.dice1}
                         dice2={props.dice2}
                         rollDice={props.rollDice}/>
        </div>
    )
}