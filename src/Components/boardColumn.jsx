/* eslint-disable react/prop-types */

import { Col, Table, Row } from "react-bootstrap";
import { FaHorse } from 'react-icons/fa';


export default function BoardColumn(props) {
  let columns = [];
  let deadColumns = [];


  deadColumns = [...Array(4).keys()].map((currentRow => {
      if(currentRow === props.deadPosition + 4){
        return(<div key={currentRow*-1} className="text-center me-2 rounded border bg-warning "  style={{width: "100px", height: "50px"}}> DEAD </div>);
      } else {
        return(<div key={currentRow*-1} className="rounded bg-secondary me-2 align-items-stretch" style={{width: "100px", height: "50px"}}>  </div>);
      }
    }));



  columns = [...Array(props.goal - 1).keys()].map((currentRow) => {
      if(props.currentPos === currentRow + 1){
        return(
          <Col key={currentRow} className="rounded bg-secondary me-2 text-center flex-grow d-flex align-items-center justify-content-center" style={{height:"50px"}}> 
            <FaHorse  color="green"/>
          </Col>
        )
      } else {
        return(
        <Col key={currentRow} className="rounded bg-secondary me-2 flex-grow" style={{height:"50px"}}></Col>
        )
      }
    })

  return(
    <Table className="d-flex flex-row">      
        {deadColumns} 
       <div style={{width: "60px"}} className="text-center">{props.number}</div>
       <Row id="4/10" className="bg-dark  d-flex flex-row w-100 flex-grow align-content-stretch">
        {columns}
        </Row>
    </Table>  )
}