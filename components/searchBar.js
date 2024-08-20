import styles from "@/styles/Home.module.css";

export default function SearchBar() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.query.value);
    const query = e.target.query.value;
    if (query[0] === "/") {
      window.open("https://" + query.replace("/", ""), "_blank");
    } else {
      const encodedQuery = encodeURIComponent(query);
      const googleSearchUrl = `https://www.google.com/search?q=${encodedQuery}`;
      window.open(googleSearchUrl, "_blank");
    }
  };

  return (
    <div className={styles.searchForm}>
      <div className={styles.search}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Prepare for blastoff!"
            id="query"
            name="query"
            autoComplete="off"
            className={styles.searchInput}
          />
        </form>
        <img src='/favicon.svg' alt='Blastoff!'/>
      </div>
    </div>
  );
}