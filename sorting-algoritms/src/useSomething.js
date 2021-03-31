import {useState}from 'react'

function useSomething(initialValue,){
const [l,setl]=useState(initialValue)

return [l,setl];
}

export default useSomething