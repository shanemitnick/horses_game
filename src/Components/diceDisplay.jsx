import { Button } from "react-bootstrap";

export default function DiceDisplay(props){
    console.log(props);

    return(
        <div className="ms-3 d-flex flex-column align-items-center justify-content-center">
            <Button onClick={() => props.rollDice()}>Roll Dice </Button>
            <h2>{props.dice1}</h2>
            <h3>{props.dice2}</h3>
        </div>
    )
}