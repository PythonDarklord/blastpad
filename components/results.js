import {useState} from "react";


export default function Results({mod, query}) {

  const [results, setResults] = useState([])

  return (
    <div>
      {mod.name} {query}
    </div>
  )
}