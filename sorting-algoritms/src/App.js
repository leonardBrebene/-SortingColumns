
import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(10);
  const [tempNum, setTempNum] = useState(10);


  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    console.log('number of columns' + numberOfColumns)
  }, [numberOfColumns])

  function Bubble() {
    console.log("a fost apelat bubble")
    let columnarray = columnArray;
    let numberofcolumns = numberOfColumns;
    for (let i = numberofcolumns - 1; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
         // setTimeout(() => {
            let k = columnarray[j];
            columnarray[j] = columnarray[j + 1];
            columnarray[j + 1] = k
         // }, 1000 * j);
        }
      }
    }
    console.log(columnarray)
  }


  function onClick(e) {
    e.preventDefault();
    setNumberColumns(tempNum);

  }
  function getArray() {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);
  }

  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Math.floor used to parse numbers to integer

  return (
    <div className="App">
      hello world <div className='arrayBar'>{l} </div>  <p />

      <form className='form-control' >
        <label>Set number of columns</label>
        <input type="text" id="numberOfColumns" value={tempNum} onChange={(e) => setTempNum(e.target.value)} />
        <button id="numberOfColumnsButton" type="submit" onClick={onClick}  >Set</button>
      </form>

      <button onClick={getArray}>Reset values</button> <p />
      <button onClick={Bubble}>Bubble </button>
      <div className='arrayBarContainer'>
        {columnArray.map((value, index) => (
          <div className="arrayBar" id={index} style={{
            height: `${value * 0.8}vh`, width: `${85 / numberOfColumns}%`,
            margin: `0 0 0 ${14.8 / numberOfColumns}%`
          }}>
          </div>))}

      </div>
    </div>

  );
}
export default App;
