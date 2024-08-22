import styles from "@/styles/search.module.css";
import {useState} from "react";
import Mods from "@/components/mods";
import Results from "@/components/results";

const modOptions = {
  'r/': {
    'className': styles.redditMod,
    'name': 'reddit',
    'placeholder': 'Search for a subreddit',
    'bubble': 'r/'
  },
  'am/': {
    'className': styles.appleMusicMod,
    'name': 'appleMusic',
    'placeholder': 'Search for a song, artist, or album',
    'bubble': 'am/'
  },
  'sp/': {
    'className': styles.spotifyMod,
    'name': 'spotify',
    'placeholder': 'Search for a song, artist, or album',
    'bubble': 'sp/'
  },
  'fand/': {
    'className': styles.fandomMod,
    'name': 'fandom',
    'placeholder': 'Search for a wiki page',
    'bubble': 'fand/'
  },
  'yt/': {
    'className': styles.youtubeMod,
    'name': 'youtube',
    'placeholder': 'Search for a video',
    'bubble': 'yt/'
  },
  'gh/': {
    'className': styles.githubMod,
    'name': 'github',
    'placeholder': 'Search for a user or user/repo',
    'bubble': 'gh/'
  },
  'g/': {
    'className': styles.googleMod,
    'name': 'google',
    'placeholder': 'Search for anything',
    'bubble': 'G/'
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [mod, setMod] = useState('')
  const [placeholder, setPlaceholder] = useState('Prepare for blastoff!')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.query.value);
    const newQuery = e.target.query.value;
    if (mod.length > 0 && newQuery.length > 0) {
      window.open(`https://reddit.com/r/${newQuery}`, '_blank')
    } else if (newQuery[0] === "/") {
      window.open("https://" + newQuery.replace("/", ""), "_blank");
    } else {
      const encodedQuery = encodeURIComponent(newQuery);
      const googleSearchUrl = `https://www.google.com/search?q=${encodedQuery}`;
      window.open(googleSearchUrl, "_blank");
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
      <Results mod={mod} query={query}/>
    </div>
  );
}