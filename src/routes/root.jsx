import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Root() {

  return(
    <div>
      <h1>Hello this is a test</h1>
      <Button variant="success"><Link to={`board`} style={{color: 'white'}}>Go to Board</Link></Button>
    </div>
  )
}