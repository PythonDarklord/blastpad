import {useEffect, useState} from "react";
import styles from "@/styles/results.module.css";

async function searchSpotify(query, token) {
  const response = await fetch('/api/spotify-search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, token }),
  });
  return await response.json();
}

async function getToken() {
  const response = await fetch("/api/spotify-token");
  const data = await response.json();
  return data.access_token;
}

export default function Results({mod, query, selected, resultOpened, setResultOpened, setResultsCount}) {
  const [token, setToken] = useState(null);
  const [results, setResults] = useState([])

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    switch (mod.name) {
      case "spotify":
        if (token && query) {
          searchSpotify(query, token).then((results) => setResults(results));
          setResultsCount(results.tracks?.items?.length);
        }
        break;
      default:
        break;
    }
  }, [query, token, mod.name]);

  useEffect(() => {
    if (resultOpened) {
      switch (mod.name) {
        case "spotify":
          window.open(results.tracks.items[selected].external_urls.spotify, "_blank");
          setResultOpened(false)
          break;
        default:
          break;
      }
    }
  }, [resultOpened]);

  if (!mod || !query) {
    return
  }

  return (
    <div className={styles.resultsContainer}>
      {results.tracks?.items?.map((item, index) => (
        <div key={item.id} className={styles.result + (index === selected ? ' ' + styles.selected : '')}>
          <img src={item.album.images[0].url} alt={item.name} style={{width: '50px', height: '50px'}}/>
          <a href={item.external_urls?.spotify} target="_blank">{item.name}</a>
        </div>
      ))}
      {selected}
    </div>
  )
}