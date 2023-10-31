import { Container } from "react-bootstrap"

export default function PlayerHands(props){
    console.log(props);

    let playerSquares = Object.keys(props.players).map((player) => {
        return(<Container className="d-flex flex-column align-items-center overflow-scroll">
                    <h3>{player}</h3>
                    <p>{JSON.stringify(props.players[player])}</p>

                </Container>
        );
    })
    return (
        <Container  className="ms-0 border border-secondary align-items-start d-flex flex-row">
            {playerSquares}
        </Container>
    )
}