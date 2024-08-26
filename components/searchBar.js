import styles from "@/styles/search.module.css";
import {useState} from "react";
import Mods from "@/components/mods";

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
    placeholder: 'Search for a user or user/repo',
    bubble: 'Github',
    encode: false,
    launch: 'https://github.com/USER_QUERY'
  },
  'g/': {
    className: styles.googleMod,
    name: 'google',
    placeholder: 'Search for anything',
    bubble: 'Google',
    encode: true,
    launch: 'https://www.google.com/search?q=USER_QUERY'
  },
  '//': {
    className: styles.googleMod,
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
  const [placeholder, setPlaceholder] = useState('Prepare for blastoff!')

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.query.value;
    if (mod) {
      window.open(mod.launch.replace('USER_QUERY', mod.encode ? encodeURIComponent(newQuery) : newQuery));
    } else {
      try {
        new URL(newQuery);
        window.open(newQuery);
      } catch (error) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(newQuery)}`);
      }
    }
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
    }
  }

  return (
    <div className={styles.searchForm}>
      <div className={styles.search}>
        <div>
          <Mods mod={mod}/>
        </div>
        <form onSubmit={handleSubmit} className={styles.searchForm} onChange={handleChange} onKeyDown={handleKeyPress}>
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
    </div>
  );
}