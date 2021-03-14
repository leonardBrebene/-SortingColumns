
import './App.css';
import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [stop, setStop] = useState(true);
  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [helpArray, setHelpArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(10);
  const [tempNum, setTempNum] = useState(10);

  var column3 = [];
  const columnArrayRef = useRef(column3);
  columnArrayRef.current = column3

  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    console.log('number of columns' + numberOfColumns)
  }, [numberOfColumns])

  useEffect(() => {
    let columnarray = columnArray;
    let helparray = helpArray;
    let k = columnarray[helpArray[0]];
    columnarray[helpArray[0]] = columnarray[helpArray[0] + 1];
    columnarray[helpArray[0] + 1] = k;
    helparray.shift();
    setHelpArray(helparray);
    const timer = setTimeout(() => {
      setColumnArray(columnarray);
    }, 100);

    return () => {
      clearTimeout(timer);
    };

  }, [helpArray,columnArray])


  function Bubble(e) {
    e.preventDefault();
    var columnarray = columnArray;
    var columnarray2 = columnarray
    var columns = numberOfColumns;
    let z = 0

    for (let i = columns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;
          console.log(columnarray)
          z++;
          Looper(j, z, columnarray2);
        }
      }
    }


  }
  function Looper(j, z, column2) {
    setInterval(() => {
      let k2 = column2[j];
      column2[j] = column2[j + 1];
      column2[j + 1] = k2;
      columnArrayRef.current = column2;
      console.log("z= " + z + " columnarray " + column3);
      let array2 = [65 + j, 69 + 2 * j, 13, 64, 89, 32, 11];
      let array3 = column2;

      setColumnArray(columnArrayRef.current);

    }, 1000 * z);
  }

  function Bubble2(e) {
    e.preventDefault();
    var helparray = [];

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnArray[j] > columnArray[j + 1]) {
          helparray.push(j)
        }
      }
    }
    setHelpArray(helparray);
  }

  function stopper(e) {
    e.preventDefault();
    setStop(false);
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

      <button onClick={getArray}>Reset values</button > <button onClick={stopper}>Use Effect</button> <p />
      <button onClick={Bubble}>Bubble </button> <button onClick={Bubble2}>Bubble2 </button>
      <div className='arrayBarContainer'>
        {columnArray.map((value, index) => (
          <div className="arrayBar" //id={index} 
            style={{
              height: `${value * 0.8}vh`, width: `${85 / numberOfColumns}%`,
              margin: `0 0 0 ${14.8 / numberOfColumns}%`
            }}>
          </div>))}

      </div>
    </div>

  );
}
export default App;
