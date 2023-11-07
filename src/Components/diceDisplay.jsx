import { Button } from "react-bootstrap";
import {  FaDice, FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'

export default function DiceDisplay(props){
    
    let iconSize = "50px";

    function getDiceLogo(number){
        switch(number){
            case 1:
                return <FaDiceOne size={iconSize} />
                break;
            case 2:
                return <FaDiceTwo size={iconSize} />
                break;
            case 3:
                return <FaDiceThree size={iconSize} />
                break;
            case 4: 
            return <FaDiceFour size={iconSize} />
                break;
            case 5: 
            return <FaDiceFive size={iconSize} />
                break;
            case 6:
                return <FaDiceSix size={iconSize} />
                break;
            default:
                return <FaDice size={iconSize} />
        }
    }

    return(
        <div className="ms-3 d-flex flex-column align-items-center justify-content-center">
            <Button onClick={() => props.rollDice()} className="mb-2">Roll Dice <FaDice /> </Button>
            <h2 className="text-white">{getDiceLogo(props.dice1)} </h2>
            <h3 className="text-white">{getDiceLogo(props.dice2)}</h3>
        </div>
    )
}