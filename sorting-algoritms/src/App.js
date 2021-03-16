
import './App.css';
import React, { useState, useEffect, useRef } from 'react'


function App() {
  //const [stop, setStop] = useState(true);
  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(10);
  const [tempNum, setTempNum] = useState(10);
  const [helpIndex, setHelpIndex] = useState(-2);
  const lastIndex = useRef(-1);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    console.log('number of columns' + numberOfColumns)
  }, [numberOfColumns])



  useEffect(() => {
    let array = columnArray;

    let k = array[helpIndex];
    array[helpIndex] = array[helpIndex + 1];
    array[helpIndex + 1] = k;
    
    
    if (lastIndex.current > -1) {
      var altceva = document.getElementById(lastIndex.current);
      altceva.style.backgroundColor = 'blue';
    }

    if (helpIndex >= 0) {
      const ceva = document.getElementById(helpIndex );
      ceva.style.backgroundColor = 'red';
    }
    lastIndex.current = helpIndex

  }, [helpIndex, columnArray])

  function Bubble(e) {
    e.preventDefault();
    let columnarray = [];
    for (let i = 0; i < numberOfColumns; i++) {
      columnarray[i] = columnArray[i];
    }
    let z = -1;
    

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;
          z++;
          
          looper(j,z);
        }
        if (i === 1) {
          looper(-2,z)
        }
      }

    }

  }

  function looper( j, z) {
    setTimeout(() => {
      setHelpIndex(j);
    }, 10 * z);
  }


  function setNumberOfColumns(e) {
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
        <button id="numberOfColumnsButton" type="submit" onClick={setNumberOfColumns}  >Set</button>
      </form>

      <button onClick={getArray}>Reset values</button >
      <button onClick={Bubble}>Bubble </button>
      <div className='arrayBarContainer'>
        {columnArray.map((value, index, colo) => (
          <div className="arrayBar"
            key={index} id={index}
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
