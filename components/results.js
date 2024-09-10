import {useEffect, useState} from "react";
import styles from "@/styles/results.module.css";
import SpotifyResults from "./spotifyResults";
import RedditResults from "./redditResults";

async function searchSpotify(query, token) {
  const response = await fetch("/api/spotify-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, token }),
  });
  return await response.json();
}

async function searchReddit(query, token) {
  const response = await fetch("/api/reddit-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, token }),
  });
  return await response.json();
}

async function getSpotifyToken() {
  const response = await fetch("/api/spotify-token");
  const data = await response.json();
  return data.access_token;
}

async function getRedditToken() {
  const response = await fetch("/api/reddit-token");
  const data = await response.json();
  return data.accessToken;
}

export default function Results({
  mod,
  query,
  selected,
  resultOpened,
  setResultOpened,
  setResultsCount,
  newTab,
}) {
  const [tokens, setTokens] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    getSpotifyToken().then((token) => setTokens((prevTokens) => ({ ...prevTokens, spotify: token })));
    getRedditToken().then((token) => setTokens((prevTokens) => ({ ...prevTokens, reddit: token })));
  }, []);

  useEffect(() => {
    switch (mod.name) {
      case "spotify":
        if (tokens.spotify && query) {
          searchSpotify(query, tokens.spotify).then((results) => {
            setResults(results);
            setResultsCount(results.tracks.items.length);
          });
        }
        break;
      case "reddit":
        if (tokens.reddit && query) {
          searchReddit(query, tokens.reddit).then((results) => {
            setResults(results);
            setResultsCount(results.subreddits.slice(0, 4).length);
          });
        }
        break;
      default:
        break;
    }
  }, [query, tokens, mod.name]);

  useEffect(() => {
    if (resultOpened) {
      switch (mod.name) {
        case "spotify":
          window.open(
            results.tracks.items[selected].external_urls.spotify,
            newTab ? "_blank" : "_self"
          );
          setResultOpened(false);
          break;
        case "reddit":
          window.open(
            `https://www.reddit.com/r/${results.subreddits[selected].name}`,
            newTab ? "_blank" : "_self"
          );
          setResultOpened(false);
          break;
        default:
          break;
      }
    }
  }, [resultOpened]);

  if (!mod || !query) {
    return;
  }

  return (
    <div className={styles.resultsContainer}>
      {(() => {
        switch (mod.name) {
          case "spotify":
            return <SpotifyResults results={results} selected={selected} />;
          case "reddit":
            return <RedditResults results={results} selected={selected} />;
          default:
            return <p style={{ margin: 0 }}>No results found</p>;
        }
      })()}
    </div>
  );
}
