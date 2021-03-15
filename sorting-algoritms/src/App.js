
import './App.css';
import React, { useState, useEffect, useRef } from 'react'

function App() {
  //const [stop, setStop] = useState(true);
  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [color, setColor] = useState('blue');
  const [numberOfColumns, setNumberColumns] = useState(10);
  const [tempNum, setTempNum] = useState(10);

  // var column3 = [];
  // const columnArrayRef = useRef(columnArray);
  //  columnArrayRef.current = columnArray;

  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    console.log('number of columns' + numberOfColumns)
  }, [numberOfColumns])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setl(l+1)
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [l])

useEffect(()=>{

//console.log('a fost apelat useeffect')
},[columnArray])




 

  function Bubble2(e) {
    e.preventDefault();
    let columnarray = columnArray;
    let z = -1;
    let saved;

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {
        
        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;

          z++;
          let clonedArray=[];
          for (let i = 0; i < numberOfColumns; i++) {
            clonedArray[i] = columnarray[i];
          }
          looper(clonedArray, z,j,saved);
          saved=j+1;
        }
        if(i===1){
          looper(columnArray,z,-2,saved)
        }
      }

    }
   
  }

  function looper(c, z,j,saved) {
    setTimeout(() => {
      setColumnArray(c);
      
      if(saved){
       var altceva=document.getElementById(saved);
        altceva.style.backgroundColor='blue';
      }
       if(j>=0){
        const ceva=document.getElementById(j+1);
       ceva.style.backgroundColor='red'
       }
       
       
      
    }, 5 * z);
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

      <button onClick={getArray}>Reset values</button >
      {/* <button onClick={stopper}>Use Effect</button> <p /> */}
      {/* <button onClick={Bubble}>Bubble </button>  */}
      <button onClick={Bubble2}>Bubble2 </button>
      <div className='arrayBarContainer'>
        {columnArray.map((value, index,colo) => (
          <div className="arrayBar"
           key={index} id={index} 
            style={{
              height: `${value * 0.8}vh`, width: `${85 / numberOfColumns}%`,
              margin: `0 0 0 ${14.8 / numberOfColumns}%`,backgroundColor:`${color}`
            }}>
          </div>))}

      </div>
    </div>

  );
}
export default App;
