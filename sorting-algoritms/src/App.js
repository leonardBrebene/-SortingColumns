
import './App.css';
import React, { useState, useEffect, useRef } from 'react';



function App() {


  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(50);
  const [tempNum, setTempNum] = useState(50);
  const [helpIndex, setHelpIndex] = useState({ num1: -2, num2: -2, color: 'red',start:-2,end:-2 });
  const lastIndex = useRef({ num1: -2, num2: -2, color: 'blue',start:-2,end:-2 });
  const pivotIndex = useRef(-2);


  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);
    

    console.log('number of columns' + numberOfColumns)
    setHelpIndex({ num1: -2, num2: -2, color: 'blue', start:-2 ,end:-2})
    lastIndex.current = { num1: -2, num2: -2, color: 'blue',};
    pivotIndex.current = -2
  }, [numberOfColumns])

  useEffect(() => {
    // console.log("in useEffet " + helpIndex['num1'] + ' ' + helpIndex['num2'])
    // console.log('lastindex'+lastIndex.current.num1+' '+lastIndex.current.num2+' '+lastIndex.current.color)
    // console.log('pivotindex'+pivotIndex.current)

    let array = columnArray;
    let k = array[helpIndex['num1']];
    array[helpIndex['num1']] = array[helpIndex['num2']];
    array[helpIndex['num2']] = k;
    
    // if(helpIndex['end']!==lastIndex.current['end']){
    //   for(let i=lastIndex.current['start'];i<lastIndex.current['end'];i++){
    //     const k=document.getElementById(i);
    //     k.style.backgroundColor='blue'
    //   }
    // }

    if(helpIndex['end']>0){
     // console.log(helpIndex['start'],helpIndex['end'])
      for(let i=helpIndex['start'];i<=helpIndex['end'];i++){
        const k=document.getElementById(i);
        k.style.backgroundColor='#0099ff'
      }
    }

    if (helpIndex['color'] === 'black' && pivotIndex.current >= 0) {
      const eraser = document.getElementById(pivotIndex.current);
      eraser.style.backgroundColor = 'blue';
    }

    if (lastIndex.current.num2 >= 0) {
      const eraser = document.getElementById(lastIndex.current.num1);
      const eraser2 = document.getElementById(lastIndex.current.num2);
      eraser.style.backgroundColor = 'blue';
      eraser2.style.backgroundColor = 'blue';
    }

    if (helpIndex['num1'] >= 0) {
      const first = document.getElementById(helpIndex['num1']);
      const second = document.getElementById(helpIndex['num2']);
      first.style.backgroundColor = helpIndex['color'];
      second.style.backgroundColor = 'pink';
      //console.log(helpIndex['num1'], helpIndex['num2'], helpIndex['color'])
    }
   
    lastIndex.current = helpIndex;
   // console.log(lastIndex.current['end'], helpIndex['end'])
    if (helpIndex['color'] === 'black') {
      pivotIndex.current = helpIndex['num1'];
      lastIndex.current.num1=0
    }

  }, [helpIndex, columnArray])


  function looper(z, first, second, bool,start,end) {
    setTimeout(() => {
      let color = 'pink'
      if (bool === true) {
        color = "black"
      }
      setHelpIndex({ num1: first, num2: second, color: color,start:start,end:end });

    }, 10 * z);
  }

  function Bubble(e) {
    e.preventDefault();
    let columnarray = JSON.parse(JSON.stringify(columnArray));
    let z = -1;

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;
          z++;

          looper(z, j, j + 1, false);
        }
        if (i === 1) {
          looper(z, -2, -2, false)
        }
      }
    }
  }

  function quickSort(e) {
    e.preventDefault();
    let z = -1;
    let columnarray = JSON.parse(JSON.stringify(columnArray));

    quickSort1(columnarray, 0, columnarray.length - 1)

    function quickSort1(array, start, end) {
      if (start >= end) {
        return;
      }

      let index = partition(array, start, end);
      quickSort1(array, start, index - 1);
      quickSort1(array, index + 1, end);
    }
    if(z>0){
      z++
      looper(z,-2,-2,true)
    }
    function partition(array, start, end) {
      z++;
      looper(z,-2,-2,'pink',start, end)
      let pivotIndex = start;
      let pivotValue = array[end];
      for (let i = start; i < end; i++) {
        z++;
        looper(z,i,i,false)
        if (array[i] < pivotValue) {
          swap(array, pivotIndex, i, false);
          pivotIndex++;
        }
      }
      swap(array, pivotIndex, end, true)
      return pivotIndex
    }

    function swap(array, first, second, bool) {
      let k = array[first];
      array[first] = array[second];
      array[second] = k;
      z++;
      looper(z, first, second, bool)
    }
    //}
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
    setHelpIndex({ num1: -2, num2: -2, color: 'blue', start:-2 ,end:-2})
    setColumnArray(array);
  
  }

  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Math.floor used to parse numbers to integer

  return (
    <div className="App">
      hello world <div className='arrayBar'>{l} {columnArray.length - 1}</div>  <p />

      <button onClick={getArray}>Reset values</button >
      <form className='form-control' >
        <label>Set number of columns</label>
        <input type="text" id="numberOfColumns" value={tempNum} onChange={(e) => setTempNum(e.target.value)} />
        <button id="numberOfColumnsButton" type="submit" onClick={setNumberOfColumns}  >Set</button>
      </form>

      <button onClick={Bubble}>Bubblesor </button>
      <button onClick={quickSort}>quickSort </button><br></br>

      <div className='arrayBarContainer'>
        {columnArray.map((value, index) => (
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
