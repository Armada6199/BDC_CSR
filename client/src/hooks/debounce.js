import { useEffect, useState } from "react"

export const  useDebounce=(value,delay=500)=>{
const [debouncedValue,setDebouncedValue]=useState(value);
useEffect(()=>{
const timout=setTimeout(()=>{
setDebouncedValue(value);
},delay)
    return clearTimeout(timout);
},[delay,value])
return debouncedValue;
}