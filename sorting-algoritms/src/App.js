import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import useSomething from './useSomething'


function App() {

  const [l, setl] = useSomething('firstvalue', '');
  const [columnArray, setColumnArray] = useState([]);
  const [numberOfColumns, setNumberColumns] = useState(50);
  const [tempNum, setTempNum] = useState(50);
  const [helpIndex, setHelpIndex] = useState({ num1: -1, num2: -1, color: 'turquoise', start: -1, end: -1, mergeValue: 0 });
  const lastIndex = useRef({ num1: -1, num2: -1, color: 'blue', start: -1, end: -1 });
  const pivotIndex = useRef(-1);
  const timer = useRef(-1);


  useEffect(() => {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    setHelpIndex({ num1: -1, num2: -1, color: 'blue', start: -1, end: -1 })
    lastIndex.current = { num1: -1, num2: -1, color: 'blue', };
    pivotIndex.current = -1;
    timer.current = -1

  }, [numberOfColumns])

  useEffect(() => {

    let array = columnArray;   //swap elements of columnArray
    let k = array[helpIndex['num1']];
    array[helpIndex['num1']] = array[helpIndex['num2']];
    if (helpIndex['mergeValue'] > 0) {
      array[helpIndex['num2']] = helpIndex['mergeValue'] //if this is called from mergeSort set value of column from mergevalue
    } else {
      array[helpIndex['num2']] = k; //if there is negative mergevalue swap elements 
    }

    if (helpIndex['end'] > 0) {  //color the working array dodgerblue
      for (let i = helpIndex['start']; i <= helpIndex['end']; i++) {
        const k = document.getElementById(i);
        k.style.backgroundColor = 'dodgerblue'
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

    lastIndex.current = helpIndex; //store de helpIndex to recolor de swapping elements next time when function si called

    if (helpIndex['color'] === 'black') { //store the index of the pivot so that it will be recolored next time
      pivotIndex.current = helpIndex['num1'];
      lastIndex.current.num1 = 0
    }

  }, [helpIndex, columnArray])


  function looper(first, second, bool, start, end, mergeValue) {
    setTimeout(() => {
      let color = 'turquoise'
      if (bool === true) {
        color = "black" //set the color of help index if bool=true then this is a pivot and color the pivot black
      }

      setHelpIndex({ num1: first, num2: second, color: color, start: start, end: end, mergeValue: mergeValue });
    }, 500 * timer.current);
  }

  function Bubble(e) {
    e.preventDefault();
    let columnarray = JSON.parse(JSON.stringify(columnArray));

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;

          timer.current++;
          looper(j, j + 1, false);
        }
        if (i === 1) { //when it finishes the loop erase the color of las columns
          looper(-1, -1, false)
        }
      }
    }
  }

  function quickSort(e) {
    e.preventDefault();
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

    if (timer.current > 0) {
      timer.current++
      looper(-1, -1, true)
    }  //when everything finishes rerun loop to erase black and turquoise column

    function partition(array, start, end) {
      timer.current++;
      looper(-1, -1, 'turquoise', start, end) //set the partition array with dodgerblue

      let pivotIndex = start;
      let pivotValue = array[end];
      for (let i = start; i < end; i++) {
        timer.current++;
        looper(i, i, false)
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

      timer.current++;
      looper(first, second, bool)
    }
  }

  function mergesort(e) {
    e.preventDefault();
    let columnarray = JSON.parse(JSON.stringify(columnArray));

    let indexColumnArray = columnarray.map((value, i) => {
      return value = { value: value, index: i }
    })

    mergeSortTopDown(indexColumnArray) //call the function from below

    function mergeSortTopDown(indexColumnArray) {
      if (indexColumnArray.length <= 1) {
        return indexColumnArray;
      }

      const middle = Math.floor(indexColumnArray.length / 2);
      const left = indexColumnArray.slice(0, middle);
      const right = indexColumnArray.slice(middle)

      return merge(mergeSortTopDown(left), mergeSortTopDown(right));
    }

    function merge(left, right) {
      let array = [];
      let smallestIndex = 999;
      let biggestIndex = -1;

      while (left.length && right.length) {

        if (left[0]['value'] < right[0]['value']) {
          array.push(left.shift())
        } else {
          array.push(right.shift())
        }
      }

      array = array.concat(left.slice()).concat(right.slice()); //setting the array with sorted elements

      array.forEach(element => {           //getting the smallest and the biggest index of the array 
        if (element['index'] < smallestIndex) {
          smallestIndex = element['index'];
        }
        if (element['index'] > biggestIndex) {
          biggestIndex = element['index']
        }
      });

      timer.current++;
      looper(smallestIndex, smallestIndex, false, smallestIndex, biggestIndex, -1);  //color the working array

      array.forEach((element) => {   //resettig the index of the array according their values
        element['index'] = smallestIndex;
        smallestIndex++;
      });

      array.forEach(element => {
        timer.current++;
        looper(element['index'], element['index'], false, smallestIndex, biggestIndex, element['value']);
        
        if(element['index']===numberOfColumns-1){ 
          timer.current++;
          looper(-1, -1, false, smallestIndex, biggestIndex, element['value']);  //call loop for the last time to color the last element blue 
        }
      });

      return array;
    }

  }

  function heapSort(e){
    console.log(e)
    
    e.preventDefault();
    let array =JSON.parse(JSON.stringify(columnArray));
    console.log(array.length)
    heapsort(array);

    function heapsort(array){
      let size =array.length
      
      for (let i=Math.floor(size/2-1);i>=0;i--){
        heapify(array,size,i)
      }

      for(let i=size-1; i>=0;i--){
        timer.current++;
        looper(0,i)

        let temp=array[0];
        array[0]=array[i];
        array[i]=temp;

        heapify(array,size, 0)
      }
    }

    function heapify(array,size,i){
      let max=i;
      let left=2*i+1;
      let right=2*i+2;

      if (left<size&&array[left]>array[max])
        max=left;

      if(right<size&&array[right]>array[max])
        max=right;

      if(max!==i){
        timer.current++;
        looper(i,max)

        let temp=array[i];
        array[i]=array[max];
        array[max]=temp

        heapify(array, size,max)
      }
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
    setHelpIndex({ num1: -1, num2: -1, color: 'blue', start: -1, end: -1 })
    setColumnArray(array);
    timer.current = -1
  }

  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Math.floor used to parse numbers to integer

  return (
    <div className="App">
      hello world <div className='arrayBar'> l este{l}<br></br> {columnArray.length - 1}</div>  <p />

      <button onClick={getArray}>Reset values</button >
      <form className='form-control' >
        <label>Set number of columns</label>
        <input type="text" id="numberOfColumns" value={tempNum} onChange={(e) => setTempNum(e.target.value)} />
        <button id="numberOfColumnsButton" type="submit" onClick={setNumberOfColumns}  >Set</button>
      </form>

      <button onClick={Bubble}>Bubblesor </button>
      <button onClick={quickSort}>quickSort </button>
      <button onClick={mergesort}>mergesort </button>
      <button onClick={heapSort}>heapSort</button>
      <br></br>

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
