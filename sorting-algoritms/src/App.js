import './App.css';
import React, { useState, useEffect, useRef } from 'react';


function App() {

  const [l, setl] = useState(0);
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(50);
  const [tempNum, setTempNum] = useState(50);
  const [helpIndex, setHelpIndex] = useState({ num1: -2, num2: -2, color: 'turquoise',start:-2,end:-2,mergeValue:0 });
  const lastIndex = useRef({ num1: -2, num2: -2, color: 'blue',start:-2,end:-2 });
  const pivotIndex = useRef(-2);
  const timer = useRef(-1);


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

    let array = columnArray;   //swap elements of columnArray
    let k = array[helpIndex['num1']];
    array[helpIndex['num1']] = array[helpIndex['num2']];
    if(helpIndex['mergeValue']>0){
      array[helpIndex['num2']]=helpIndex['mergeValue'] 
    }else{
      array[helpIndex['num2']] = k; 
    }
      
    if(helpIndex['end']>0){  //color the working array dodgerblue
      for(let i=helpIndex['start'];i<=helpIndex['end'];i++){
        const k=document.getElementById(i);
        k.style.backgroundColor='dodgerblue'
      }
    }

    if (helpIndex['color'] === 'black' && pivotIndex.current >= 0) {  //erase the last pivot 
      const eraser = document.getElementById(pivotIndex.current);
      eraser.style.backgroundColor = 'blue';
    }

    if (lastIndex.current.num2 >= 0) {  //erasing the columns colored turqoise
      const eraser = document.getElementById(lastIndex.current.num1);
      const eraser2 = document.getElementById(lastIndex.current.num2);
      eraser.style.backgroundColor = 'blue';
      eraser2.style.backgroundColor = 'blue';
    }

    if (helpIndex['num1'] >= 0) {
      const first = document.getElementById(helpIndex['num1']); //color the swaping elements
      const second = document.getElementById(helpIndex['num2']);
      first.style.backgroundColor = helpIndex['color'];
      second.style.backgroundColor = 'turquoise';
    }
   
    lastIndex.current = helpIndex;
 
    if (helpIndex['color'] === 'black') { //store the index of the pivot 
      pivotIndex.current = helpIndex['num1'];
      lastIndex.current.num1=0
    }

  }, [helpIndex, columnArray])


  function looper(z, first, second, bool,start,end,mergeIndex) {
    setTimeout(() => {
      let color = 'turquoise'
      if (bool === true) {
        color = "black"
      }
    
      setHelpIndex({ num1: first, num2: second, color: color,start:start,end:end,mergeValue:mergeIndex });
     
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
        if (i === 1) { //when it finishes the loop erase the color of las columns
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
    }  //when everything finishes rerun loop to erase black and turquoise column

    function partition(array, start, end) {
      z++;
      looper(z,-2,-2,'turquoise',start, end) //set the partition array with dodgerblue
      
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

    function swap(array, first, second, bool) { //bool true===color pivot with black
      let k = array[first];
      array[first] = array[second];
      array[second] = k;
      z++;
      looper(z, first, second, bool)
    }
   
  }

  function mergesort(e){
    e.preventDefault();
    let columnarray=JSON.parse(JSON.stringify(columnArray));
    
    let indexColumnArray= columnarray.map((value,i)=>{
     return value={value:value,index:i}
    })
    mergeSortTopDown(indexColumnArray)

    function mergeSortTopDown(indexColumnArray){
      if(indexColumnArray.length<=1){
        return indexColumnArray;
      }

      const middle=Math.floor(indexColumnArray.length/2);
      const left =indexColumnArray.slice(0,middle);
      const right=indexColumnArray.slice(middle)
      
      return merge(mergeSortTopDown(left),mergeSortTopDown(right));
    } 

    function merge(left,right){
      let array=[];
      let smallestIndex=999;
      let biggestIndex=-1;

      while(left.length && right.length){
        
        if(left[0]['value']<right[0]['value']){
          array.push(left.shift())
        }else{
          array.push(right.shift())
        }
      }
      
      let test= array.concat(left.slice()).concat(right.slice());
      
      test.forEach(element => {
        if(element['index']<smallestIndex){
        smallestIndex=element['index'];
      }
        if(element['index']>biggestIndex){
          biggestIndex=element['index']
        }
      });
      
      timer.current++;
        looper(timer.current,smallestIndex,smallestIndex,false,smallestIndex,biggestIndex,-2);
        
      test.forEach((element) => {
        element['index']=smallestIndex;
        smallestIndex++;
      });

      test.forEach(element => {
        timer.current++;
        looper(timer.current,element['index'],element['index'],false,smallestIndex,biggestIndex,element['value'],test);
      });
       
       return test;
    }
    
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
    timer.current=0
  
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
      <button onClick={quickSort}>quickSort </button>
      <button onClick={mergesort}>mergesort </button><br></br>

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
