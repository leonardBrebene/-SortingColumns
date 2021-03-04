
import './App.css';
import React, { useState, useEffect } from 'react'

function App() {

  const [l, setl] = useState(0);
  const [columnArray,setColumnArray]=useState([]);


  useEffect(() => {
    setTimeout(() => altceva(), 1000);
    setTimeout(()=>GetArray(),10000);
  })

  var k = 0;
  function altceva() {
    k = l;
    k++;
    setl(k);
  }

  function GetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomIntBetween(5, 30))
    }
    setColumnArray(array);
  }

  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="App">
      hello world {l} {columnArray.map(value=>(<li>{value}</li>))}
    </div>
  );
}
export default App;
