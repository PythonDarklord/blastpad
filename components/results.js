import {useState} from "react";


export default function Results({mod, query}) {

  const [results, setResults] = useState([])

  if (mod === 'r/') {
    fetch(`https://www.reddit.com/subreddits/search.json?q=${query}&limit=5`)
      .then(response => response.json())
      .then(data => {
        setResults(data.data.children);
      })
      .catch(error => {
        console.error('Error fetching subreddit search results:', error);
      });
  }

  return (

    <div>
      {results.map((result) => (
        <div key={result.display_name}>
          <img src={result.icon_img} alt=''/>
          <h2>{result.display_name}</h2>
        </div>
      ))}
    </div>
  )
}