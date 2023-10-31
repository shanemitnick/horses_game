/* eslint-disable react/prop-types */

import { Col, Table, Row } from "react-bootstrap";

export default function BoardColumn(props) {
  let columns = [];
  let deadColumns = [];


  deadColumns = [...Array(4).keys()].map((currentRow => {
      if(currentRow === props.deadPosition + 4){
        return(<div key={currentRow*-1} className="text-center border bg-warning border-white"  style={{width: "100px", height: "50px"}}> DEAD </div>);
      } else {
        return(<div key={currentRow*-1} className="border bg-dark border-white align-items-stretch" style={{width: "100px", height: "50px"}}>  </div>);
      }
    }));



  columns = [...Array(props.goal - 1).keys()].map((currentRow) => {
      if(props.currentPos === currentRow + 1){
        return(
          <Col key={currentRow} className="border bg-success text-center border-white flex-grow" style={{height:"50px"}}>  HORSE
          </Col>
        )
      } else {
        return(
        <Col key={currentRow} className="border bg-success border-white flex-grow align-items-stretch" style={{height:"50px"}}></Col>
        )
      }
    })

  return(
    <Table className="d-flex flex-row border border-white">      
        {deadColumns} 
       <div style={{width: "60px"}} className="text-center">{props.number}</div>
       <Row id="4/10" className="bg-secondary border border-white d-flex flex-row w-100 align-items-stretch">
        {columns}
        </Row>
    </Table>  )
}