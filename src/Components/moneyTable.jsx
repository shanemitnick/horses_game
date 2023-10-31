/* eslint-disable react/prop-types */

import { Row, Table, Col } from "react-bootstrap"

export default function MoneyTable(props){

  let columns = Object.keys(props.moneyView).map((horse) => {
    return(
      <Col key={horse} className="bg-success mt-2">
        {horse} owes: {props.moneyView[horse]} chips
      </Col>
    )
  })

  return(
    <div className="w-100">
      <Table>
        <Row>
          {columns}
        </Row>
      </Table>
    </div>
  )
}