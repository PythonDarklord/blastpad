import styles from "@/styles/search.module.css";
import {useState} from "react";
import Mods from "@/components/mods";
import Results from "./results";

const modOptions = {
  'r/': {
    className: styles.redditMod,
    name: 'reddit',
    placeholder: 'Search for a subreddit',
    bubble: 'r/',
    encode: false,
    launch: 'https://reddit.com/r/USER_QUERY'
  },
  'am/': {
    className: styles.appleMusicMod,
    name: 'appleMusic',
    placeholder: 'Search for a song, artist, or album',
    bubble: 'Apple Music',
    encode: true,
    launch: 'https://music.apple.com/us/search?term=USER_QUERY'
  },
  'sp/': {
    className: styles.spotifyMod,
    name: 'spotify',
    placeholder: 'Search for a song, artist, or album',
    bubble: 'Spotify',
    encode: true,
    launch: 'https://open.spotify.com/search/USER_QUERY'
  },
  'fand/': {
    className: styles.fandomMod,
    name: 'fandom',
    placeholder: 'Search for a wiki page',
    bubble: 'Fandom',
    encode: true,
    launch: 'https://community.fandom.com/wiki/Special:Search?query=USER_QUERY&scope=cross-wiki'
  },
  'yt/': {
    className: styles.youtubeMod,
    name: 'youtube',
    placeholder: 'Search for a video',
    bubble: 'YouTube',
    encode: true,
    launch: 'https://www.youtube.com/results?search_query=USER_QUERY'
  },
  'gh/': {
    className: styles.githubMod,
    name: 'github',
    placeholder: 'Enter a user or user/repo',
    bubble: 'Github',
    encode: false,
    launch: 'https://github.com/USER_QUERY'
  },
  'ghs/': {
    className: styles.githubMod,
    name: 'github search',
    placeholder: 'Search Github',
    bubble: 'Github Search',
    encode: true,
    launch: 'https://github.com/search?q=USER_QUERY&type=repositories'
  },
  'g/': {
    className: styles.googleMod,
    name: 'google',
    placeholder: 'Search for anything',
    bubble: 'Google',
    encode: true,
    launch: 'https://www.google.com/search?q=USER_QUERY'
  },
  'az/': {
    className: styles.amazonMod,
    name: 'amazon',
    placeholder: 'Search for a product',
    bubble: 'Amazon',
    encode: true,
    launch: 'https://www.amazon.com/s?k=USER_QUERY'
  },
  '//': {
    className: styles.urlMod,
    name: 'url',
    placeholder: 'Enter a URL',
    bubble: 'https://',
    encode: true,
    launch: 'https://USER_QUERY'
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [mod, setMod] = useState('')
  const [selectedResult, setSelectedResult] = useState(-1)
  const [placeholder, setPlaceholder] = useState('Prepare for blastoff!')
  const [resultOpened, setResultOpened] = useState(false)
  const [resultsCount, setResultsCount] = useState(0)
  const [newTab, setNewTab] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.query.value;
    if (selectedResult !== -1) {
      setResultOpened(true);
    } else if (mod) {
      window.open(mod.launch.replace('USER_QUERY', mod.encode ? encodeURIComponent(newQuery) : newQuery), newTab ? '_blank' : '_self');
    } else {
      try {
        new URL(newQuery);
        window.open(newQuery, '_self');
      } catch (error) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(newQuery)}`, newTab ? '_blank' : '_self');
      }
    }
    e.target.reset();
  };

  const handleChange = (e) => {
    const newQuery = e.target.value

    if (Object.keys(modOptions).includes(newQuery)) {
      setMod(modOptions[newQuery])
      setQuery('')
      e.target.value = ''
      setPlaceholder(modOptions[newQuery].placeholder)
    } else {
      setQuery(newQuery)
    }
  }

  const handleKeyPress = (e) => {
    if (query.length === 0 && e.key === 'Backspace') {
      setMod('')
      setPlaceholder('Prepare for blastoff!')
      setSelectedResult(-1)
    } else if (e.key === 'ArrowUp' && selectedResult >= 0) {
      e.preventDefault()
      setSelectedResult(selectedResult - 1)
    } else if (e.key === 'ArrowDown' && selectedResult < resultsCount - 1) {
      e.preventDefault()
      setSelectedResult(selectedResult + 1)
    } else if (e.key === 'Enter') {
      if (e.ctrlKey) {
        setNewTab(true)
      } else {
        setNewTab(false)
      }
    }
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <div className={styles.searchBarInner}>
          <Mods mod={mod}/>
          <form onSubmit={handleSubmit} className={styles.searchForm} onChange={handleChange}
                onKeyDown={handleKeyPress}>
            <input
              type="text"
              placeholder={placeholder}
              id="query"
              name="query"
              autoComplete="off"
              className={styles.searchInput}
            />
            <button type='submit' className={styles.searchSubmit}>
              <img src='/favicon.svg' alt='Blastoff!' height="60%"/>
            </button>
          </form>
        </div>
        <Results mod={mod} query={query} selected={selectedResult} resultOpened={resultOpened} setResultOpened={setResultOpened} setResultsCount={setResultsCount} newTab={newTab} setNewTab={setNewTab}/>
      </div>
    </div>
  );
}