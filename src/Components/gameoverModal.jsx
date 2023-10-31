import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";

export default function GameOverModal(props){
    const [moneyOwed, setMoneyOwed] = useState();

    console.log(props);

    let playersTotals = {};

    // algo is not working yet.
    Object.keys(props.players).forEach((player) => {
        let moneyOwed = 0;
        for (const [key, value] in Object.entries(props.moneyView)){
            if(value > 0){
                // check if key is in player's cards
                props.players[player].map((card) => {
                    if(!( card == undefined ) && card.includes(key)){
                        console.log("LOSER FOUND: ", card);
                        moneyOwed += props.moneyView[key];
                    }
                })
            }
        }

        if(moneyOwed > 0){
            playersTotals[player] = moneyOwed;
        }

    });


    console.log(playersTotals);
    return(
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Horse {props.winningHorse} won!</Modal.Title>
                <CloseButton onClick={() => props.closeModal()} />
            </Modal.Header>
            <Modal.Body>
                <h1>Winning Players:</h1>


                <h1>Players who owe money:</h1>

            </Modal.Body>

        </Modal>
    )
}