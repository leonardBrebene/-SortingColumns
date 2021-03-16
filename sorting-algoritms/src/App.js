
import './App.css';
import React, { useState, useEffect, useRef } from 'react'


function App() {
  //const [stop, setStop] = useState(true);
  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(10);
  const [tempNum, setTempNum] = useState(10);
  const [helpIndexBubble, setHelpIndexBubble] = useState(-2);
  const [helpIndexQuick,setHelpIndexQuick]=useState({num1:-2,num2:-2,color:'red'});
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
    console.log("useEffectul dee bubble")
    let array = columnArray;
   
    let k = array[helpIndexBubble];
    array[helpIndexBubble] = array[helpIndexBubble + 1];
    array[helpIndexBubble + 1] = k;

    if (lastIndex.current > -1) {
      var altceva = document.getElementById(lastIndex.current);
      altceva.style.backgroundColor = 'blue';
    }

    if (helpIndexBubble >= 0) {
      const ceva = document.getElementById(helpIndexBubble);
      ceva.style.backgroundColor = 'red';
    }
    lastIndex.current = helpIndexBubble;
  

  }, [helpIndexBubble, columnArray])

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

          looper(j, z);
        }
        if (i === 1) {
          looper(-2, z)
        }
      }
    }
  }

  function looper(j, z) {
    setTimeout(() => {
      setHelpIndexBubble(j);
    }, 10 * z);
  }

useEffect(()=>{
  let array = columnArray;
  let k = array[helpIndexQuick['num1']];
  array[helpIndexQuick['num1']] = array[helpIndexQuick['num2']];
  array[helpIndexQuick['num2']] = k;

   if (lastIndex.current > -1) {
    var altceva = document.getElementById(lastIndex.current);
     altceva.style.backgroundColor = 'blue';
   }

  if (helpIndexQuick['num1'] >= 0) {
    const ceva = document.getElementById(helpIndexQuick['num1']);
    const ceva1 = document.getElementById(helpIndexQuick['num2']);
    ceva.style.backgroundColor = helpIndexQuick['color']; 
    
  }
  if(helpIndexQuick['color']==='pink' )
  lastIndex.current = helpIndexQuick['num1']

},[helpIndexQuick,columnArray])

function looperquick(first,second, z,bool) {
  setTimeout(() => {
    let color='pink'
    if(bool===true){
       color="rgb(5, 5, 201)"
    }
    setHelpIndexQuick({num1:first,num2:second,color:color});
    
  }, 100 * z);
}

  function quickSort(e) {
    e.preventDefault();
    let z=-1;
    let columnarray = [];
    for (let i = 0; i < numberOfColumns; i++) {
      columnarray[i] = columnArray[i];
    }

    quickSort1(columnarray, 0, columnArray.length-1)
   
    function quickSort1(array, start, end) {
      if (start >= end) {
        return;
      }

      let index = partition(array, start, end);
      quickSort1(array, start, index - 1);
      quickSort1(array, index + 1, end);

      function partition(array, start, end) {
        
        let pivotIndex = start;
        let pivotValue = array[end];
        for (let i = start; i < end; i++) {
          if (array[i] < pivotValue) {
            swap(array, pivotIndex, i,false);
            pivotIndex++;
          }
        }
        swap(array,pivotIndex, end,true)
        return pivotIndex
      }

      function swap(array, first, second,bool) {
        let k = array[first];
        array[first] = array[second];
        array[second] = k;
        z++;
        looperquick(first,second,z,bool)
      }


    }
    // console.log("columnarray"+columnarray);
    // setColumnArray(columnarray);
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
      <button onClick={quickSort}>quickSort </button>
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
