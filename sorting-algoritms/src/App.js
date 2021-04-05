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
  const stoper = useRef(false)

  useEffect(() => {
    stoper.current=false
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    setColumnArray(array);

    setHelpIndex({ num1: -1, num2: -1, color: 'blue', start: -1, end: -1 })
    lastIndex.current = { num1: -1, num2: -1, color: 'blue', };
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

    if (lastIndex.current.num2 >= 0) {  //erasing the columns colored turqoise
      const eraser = document.getElementById(lastIndex.current.num1);
      const eraser2 = document.getElementById(lastIndex.current.num2);
      eraser.style.backgroundColor = 'blue';
      eraser2.style.backgroundColor = 'blue';
    }

    if (helpIndex['end'] > 0) {  //color the working array dodgerblue
      for (let i = helpIndex['start']; i <= helpIndex['end']; i++) {
        const k = document.getElementById(i);
        k.style.backgroundColor = helpIndex['color'];
      }
    }

    if (helpIndex['num1'] >= 0) {
      const first = document.getElementById(helpIndex['num1']); //color the swaping elements
      const second = document.getElementById(helpIndex['num2']);
      first.style.backgroundColor = helpIndex['color'];
      second.style.backgroundColor = 'turquoise';
    }

    lastIndex.current = helpIndex; //store de helpIndex to recolor de swapping elements next time when function si called

  }, [helpIndex, columnArray])


  async function looper(first, second, color, start, end, mergeValue) {

    if (color !== 'dodgerblue' && color !== 'blue') {
      color = "turquoise"
    }

    if (stoper.current === true) {
      await sleep(30)
        .then(setHelpIndex({ num1: first, num2: second, color: color, start: start, end: end, mergeValue: mergeValue }));
    }
    else {
      setHelpIndex({ num1: -1, num2: -1,color: 'blue',start: '0', end: columnArray.length-1  })
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function checkIfFunctionRunning() {
    if (stoper.current === false) {
      stoper.current = true;
    }
    else stoper.current = false;
  }

  function stopTimer(e) {
    e.preventDefault();
    console.log('a fost apelat stop timer')
    stoper.current = false;
  }

  async function parametersToBeChanged(first, second, color, start, end, mergeValue) {
    if (stoper.current === true) {
      await looper(first, second, color, start, end, mergeValue);
    }
  }

  async function Bubble(e) {
    e.preventDefault();
    checkIfFunctionRunning();
    let columnarray = JSON.parse(JSON.stringify(columnArray));

    for (let i = numberOfColumns; i > -1; i--) {
      for (let j = 0; j < i; j++) {

        if (columnarray[j] > columnarray[j + 1]) {
          let k = columnarray[j];
          columnarray[j] = columnarray[j + 1];
          columnarray[j + 1] = k;

          await parametersToBeChanged(j, j + 1);
        }
        if (i === 1) { //when it finishes the loop erase the color of las columns
          await looper(-1, -1)
        }
      }
    }
  }

  async function quickSort(e) {
    e.preventDefault();
    checkIfFunctionRunning();
    let columnarray = JSON.parse(JSON.stringify(columnArray));
    await quicksort(columnarray, 0, columnarray.length - 1) //call the function
    looper(-1, -1, true); //rerun the loop to color blue last changed elements
    stoper.current = false; //function can be called again

    async function quicksort(array, start, end) {
      if (start >= end) {
        return;
      }

      let index = await partition(array, start, end);

      // await Promise.all([
      //   quicksort(array, start, index - 1),
      //   quicksort(array, index + 1, end)])

      await quicksort(array, start, index - 1);
      await quicksort(array, index + 1, end);
    }

    async function partition(array, start, end) {

      let pivotIndex = start;
      let pivotValue = array[end];

      for (let i = start; i < end; i++) {

        if (array[i] < pivotValue) {
          await parametersToBeChanged(-1, -1, 'dodgerblue', pivotIndex + 1, i) //color with dodgerblue columns from pivotindex to I
          await swap(array, pivotIndex, i, false);
          pivotIndex++;
        }
        await parametersToBeChanged(-1, -1, 'dodgerblue', pivotIndex + 1, i) //color with dodgerblue columns from pivotindex to I
        await parametersToBeChanged(i, i)
      }

      await parametersToBeChanged(-1, -1, 'blue', pivotIndex, end) //color dodgerblue columns with blue

      await swap(array, pivotIndex, end)
      return pivotIndex
    }

    async function swap(array, first, second, color) {
      let k = array[first];
      array[first] = array[second];
      array[second] = k;

      await parametersToBeChanged(first, second, color)
    }
  }


  async function mergesort(e) {
    e.preventDefault();
    let columnarray = JSON.parse(JSON.stringify(columnArray));
    checkIfFunctionRunning();
    let indexColumnArray = columnarray.map((value, i) => {
      return value = { value: value, index: i }
    })

    await mergeSortTopDown(indexColumnArray) //call the function from below
    looper(-1, -1, true); //rerun the loop to color blue last changed elements
    stoper.current = false; //function can be called again

    async function mergeSortTopDown(indexColumnArray) {
      if (indexColumnArray.length <= 1) {
        return indexColumnArray;
      }

      const middle = Math.floor(indexColumnArray.length / 2);
      const left = indexColumnArray.slice(0, middle);
      const right = indexColumnArray.slice(middle)

      return merge(await mergeSortTopDown(left), await mergeSortTopDown(right));
    }

    async function merge(left, right) {
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

      await parametersToBeChanged(smallestIndex, smallestIndex, 'blue', smallestIndex, biggestIndex, -1);  //color the working array

      array.forEach((element) => {   //resettig the index of the array according their values
        element['index'] = smallestIndex;
        smallestIndex++;
      });

      for(let i =0;i<array.length;i++){
        await colorColumns(array[i])
      }
    
      async function colorColumns(element) {
        await parametersToBeChanged(element['index'], element['index'], false, smallestIndex, biggestIndex, element['value']); //color the overwrited element

        if (element['index'] === numberOfColumns - 1) {
          await parametersToBeChanged(-1, -1, false, smallestIndex, biggestIndex, element['value']);  //call loop for the last time to color the last element blue 
        }
      }
      return array;
    }
  }

 async function heapSort(e) {

    e.preventDefault();
    checkIfFunctionRunning();
    let array = JSON.parse(JSON.stringify(columnArray));
    await heapsort(array);
    looper(-1, -1, true); //rerun the loop to color blue last changed elements
    stoper.current = false; //function can be called again

    async function heapsort(array) {
      let size = array.length

      for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
        await heapify(array, size, i)
      }

      for (let i = size - 1; i >= 0; i--) {
        await parametersToBeChanged(0, i)

        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        await heapify(array, i, 0)
      }

      await parametersToBeChanged(-1, -1);
    }

   async function heapify(array, size, i) {
      let max = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < size && array[left] > array[max])
        max = left;

      if (right < size && array[right] > array[max])
        max = right;

      if (max !== i) {
        await parametersToBeChanged(i, max)

        let temp = array[i];
        array[i] = array[max];
        array[max] = temp

       await heapify(array, size, max)
      }
    }
  }

  function getArray() {
    const array = [];
    for (let i = 0; i < numberOfColumns; i++) {
      array.push(randomIntBetween(1, 100))
    }
    stoper.current=false;
    setColumnArray(array);
  }

  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Math.floor used to parse numbers to integer

  return (
    <div className="App">

      <button onClick={getArray}>Reset values</button >
      <button onClick={stopTimer}>Stop animation</button>
      <form className='form-control' >
        <label>Set number of columns</label>
        <input type="text" id="numberOfColumns" value={tempNum} onChange={(e) => setTempNum(e.target.value)} />
        <button id="numberOfColumnsButton" type="submit" onClick={(e)=>{e.preventDefault() ;setNumberColumns(tempNum)}}  >Set</button>
      </form>

      <button onClick={Bubble}>Bubble sort </button>
      <button onClick={quickSort}>Quick sort </button>
      <button onClick={mergesort}>Merge sort </button>
      <button onClick={heapSort}>Heap sort</button>

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
