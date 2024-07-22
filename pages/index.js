import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import AddFavorite from "@/components/addFavorite";

export default function Home() {
  const [favoritePopup, setFavoritePopup] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.getElementById("query").focus();
  });

  useEffect(() => {
    const cookies = document.cookie;
    if (cookies.includes("favorites")) {
      console.log(cookies);
    } else {
      document.cookie = "favorites = {}";
    }
  }, []);

  const handleSubmt = (e) => {
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

  const addFavorite = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    setFavoritePopup(false);
    setFavorites([...favorites, { name: name, url: url }]);
    document.cookie = `favorites: ${favorites}`;
  };

  const listFavorite = (e) => {
    //List for favorites
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    var names = [];
    names.push(name);
    var urls = [];
    urls.push(url);
    let nameslist = document.getElementById("favoritesList");
    for (i = 0; i < names.length; ++i) {
      let li = document.createElement("li");
      li.innerText - names[i];
      nameslist.push(li);
    }
    let urlslist = document.getElementById("favoritesList");
    for (i = 0; i < urls.length; ++i) {
      let li = document.createElement("li");
      li.innerText - urls[i];
      nameslist.push(li);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}> BlastPad </h1>
          <form onSubmit={handleSubmt}>
            <input
              type="text"
              placeholder="Prepare for blastoff!"
              id="query"
              name="query"
              className={styles.search}
            />
          </form>
        </div>
        <div className={styles.tiles}>
          <div
            className={styles.subsection}
            style={{ background: "var(--favoritesColor)" }}
          >
            <div className={styles.favorites}>
              <h2 className={styles.subheader}> Favorites </h2>
              <div className={styles.scrollBox}>
                <ul id="favoritesList">
                  {/* {favorites.map((item) => (
                    <li>
                      <a href={item.url}>{item.name}</a>
                    </li>
                  ))} */}
                </ul>
              </div>
              <button className={styles.button} 
              onClick={() => setFavoritePopup(true)}>
                Add Favorite
              </button>
            </div>
          </div>
          <div
            className={styles.subsection}
            style={{ background: "var(--emailsColor" }}
          >
            <div className={styles.emails}>
              <h2 className={styles.subheader}> Emails </h2>
            </div>
          </div>
        </div>
        {favoritePopup && (
          <AddFavorite
            closeMethod={() => setFavoritePopup(false)}
            addMethod={addFavorite}
          />
        )}
      </main>
    </>
  );
}
