import {useEffect, useState} from "react";

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

export default function Results({mod, query}) {
  const [token, setToken] = useState(null);
  const [results, setResults] = useState([])

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    if (mod.name === "spotify" && token) {
      searchSpotify(query, token).then((results) => setResults(results));
    }
  }, [query, token, mod.name]);

  return (
    <div>
      {results.tracks?.items?.map((item) => (
        <div key={item.id}>
          <a href={item.external_urls?.spotify} target="_blank">{item.name}</a>
        </div>
      ))}
    </div>
  )
}