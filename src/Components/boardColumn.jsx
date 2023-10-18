/* eslint-disable react/prop-types */

export default function BoardColumn(props) {
  let columns = [];
  let deadColumns = [];
  // for(let j = 0; j <= numberColumns; j++){
  //   columns.push((
  //       <div className="border border-white w-100 h-50"> 
  //       </div>
  //   ))
  // }
  deadColumns = [...Array(4).keys()].map((currentRow => {
    if(currentRow === props.deadPosition + 4){
      return(<div key={currentRow*-1} className="text-center border bg-warning border-white w-100" style={{height: "50px"}}> DEAD </div>);
    } else {
      return(<div key={currentRow*-1} className="border border-white w-100" style={{height: "50px"}}>  </div>);
    }
  }));
  columns = [...Array(props.goal - 1).keys()].map((currentRow) => {
    if(props.currentPos === currentRow + 1){
      return(
        <div key={currentRow} className="border bg-success text-center border-white w-100 h-50">  HORSE
        </div>
      )
    } else {
      return(
       <div key={currentRow} className="border border-white w-100 h-50">  </div>
      )
    }
  })

  return(
    <div className="d-flex flex-column bg-secondary border border-white">      
        {deadColumns} 
       <div className="text-center">{props.number}</div>
       <div id="4/10" className="bg-secondary border border-white d-flex flex-column" style={{width: "150px", height:"650px"}}>
        {columns}
        </div>
    </div>  )
}