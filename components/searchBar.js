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
    <div>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Prepare for blastoff!"
          id="query"
          name="query"
          className={styles.search}
          autoComplete="off"
        />
      </form>
    </div>
  );
}