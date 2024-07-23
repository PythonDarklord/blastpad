import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import AddFavorite from "@/components/addFavorite";
import SettingsMenu from "@/components/settingsMenu";
import settingsMenu from "@/components/settingsMenu";
import AddEmail from "@/components/addEmail";
import addEmail from "@/components/addEmail";

export default function Home() {
  const [favoritePopup, setFavoritePopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    document.getElementById("query").focus();
  });

  useEffect(() => {
    const cookies = document.cookie;
    if (cookies.includes("favorites")) {
      const cookiesList = cookies.split(";");
      const favoritesCookie = cookiesList
        .filter((item) => item.includes("favorites="))[0]
        .replace("favorites=", "");
      const cookieData = JSON.parse(favoritesCookie);
      setFavorites(cookieData);
    } else {
      document.cookie = "favorites = []";
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
    var now = new Date();
    var expires = new Date(
      now.getFullYear() + 10,
      now.getMonth(),
      now.getDate()
    );
    var expiresFormatted = expires.toUTCString();
    document.cookie = `favorites = ${JSON.stringify(
      favorites
    )}; expires=${expiresFormatted}`;
  };

  const addEmail = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    setEmailPopup(false);
    setEmails([...emails, { name: name, email: email }]);
    var now = new Date();
    var expires = new Date(
      now.getFullYear() + 10,
      now.getMonth(),
      now.getDate()
    );
    var expiresFormatted = expires.toUTCString();
    document.cookie = `emails = ${JSON.stringify(
      emails
    )}; expires=${expiresFormatted}`;
  };

  return (
    <>
      <Head>
        <title>BlastPad</title>
        <meta name="description" content="Prepare for launch!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <img
            onClick={() => setSettingsPopup(true)}
            src="settings.png"
            className={styles.setcog}
            alt="Settings Cog"
          />
          <h1 className={styles.title}> BlastPad </h1>
        </header>
        <form onSubmit={handleSubmt} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Prepare for blastoff!"
            id="query"
            name="query"
            className={styles.search}
            autoComplete="off"
          />
        </form>
        <div className={styles.tiles}>
          <div
            className={styles.subsection}
            style={{ background: "var(--favoritesColor)" }}
          >
            <div className={styles.favorites}>
              <h2 className={styles.subheader}> Favorites </h2>
              <div className={styles.scrollBox}>
                <ul id="favoritesList" className={styles.favoritesList}>
                  {favorites.map((item) => (
                    <li>
                      <a href={item.url} target="_blank">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={styles.button}
                onClick={() => setFavoritePopup(true)}
              >
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
              <div className={styles.scrollBox}>
                <ul id="emailsList" className={styles.favoritesList}>
                  {emails.map((item) => (
                    <li>
                      <a href={item.url} target="_blank">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={styles.button}
                onClick={() => setEmailPopup(true)}
              >
                Add Email
              </button>
            </div>
          </div>
        </div>
        {favoritePopup && (
          <AddFavorite
            closeMethod={() => setFavoritePopup(false)}
            addMethod={addFavorite}
          />
        )}
        {settingsPopup && (
          <SettingsMenu
            closeMethod={() => setSettingsPopup(false)}
            applyMethod={settingsMenu}
          />
        )}
        {emailPopup && (
          <AddEmail
            closeMethod={() => setEmailPopup(false)}
            applyMethod={addEmail}
          />
        )}
      </main>
    </>
  );
}
