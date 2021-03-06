
import './App.css';
import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'

function App() {

  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns,setNumberColumns]=useState(10);


  useEffect(() => {
    var k = 0;
    function altceva() {
      k = l;
      k++;
      setl(k);
    }

    setTimeout(() => altceva(), 1000);
  }, [l])

  useEffect(() => {
    function GetArray() {
      const array = [];
      for (let i = 0; i < numberOfColumns; i++) {
        array.push(randomIntBetween(1, 100))
      }
      setColumnArray(array);
    }
    function handleSubmit(e){
      e.preventDefault();
    }

    setTimeout(() => GetArray(), 5000);
  }, [columnArray,numberOfColumns])


  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Math.floor used to parse numbers to integer

  return (
    <div className="App">
      <div >ceva</div>
      <div className='form-control'>
          <label>Number of columns</label>
          <input type="text" id="lastName" name="lastName"
            value={numberOfColumns} onChange={(e) => setNumberColumns(e.target.value)} />
        </div>
        <button id="saveContact" type="submit" >Save</button>
      hello world <div className='arrayBar'>{l}</div>
      <p></p>
      <div className='arrayBarContainer'>
        {columnArray.map( value => (
        <div className="arrayBar" style={{height:`${value*0.8}vh`,width:`${85/numberOfColumns}%`,margin:`0 ${14.8/numberOfColumns}% 0 0`} }></div>))}
      </div>
    </div>

  );
}
export default App;
