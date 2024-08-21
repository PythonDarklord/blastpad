import styles from "@/styles/search.module.css";
import {useState} from "react";
import Mods from "@/components/mods";

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

    if (newQuery === 'r/') {
      setMod('r/')
      setQuery('')
      e.target.value = ''
      setPlaceholder('Enter a subreddit!')
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
        <form onSubmit={handleSubmit} className={styles.searchForm} onChange={handleChange} onKeyUp={handleKeyPress}>
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