import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import AddFavorite from "@/components/addFavorite";
import SettingsMenu from "@/components/settingsMenu";
import AddEmail from "@/components/addEmail";
import AddTask from "@/components/addTask";
export default function Home() {
  const [favoritePopup, setFavoritePopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loadedFavorites, setLoadedFavorites] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loadedEmails, setLoadedEmails] = useState(false);
  const [toDoPopup, setToDoPopup] = useState(false);

  useEffect(() => {
    document.getElementById("query").focus();
  }, []);

  useEffect(() => {
<<<<<<< Updated upstream
=======
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
    setLoadedFavorites(true);
>>>>>>> Stashed changes

      const storedFavorites = localStorage.getItem("favorites");
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
      setLoadedFavorites(true);

    const storedEmails = localStorage.getItem("emails");
    const parsedEmails = JSON.parse(storedEmails);
    setEmails(parsedEmails);
    setLoadedEmails(true);
  }, []);

  useEffect(() => {
    loadedFavorites &&
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    loadedEmails && localStorage.setItem("emails", JSON.stringify(emails));
  }, [emails]);

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
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const addEmail = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    setEmailPopup(false);
    setEmails([...emails, { name: name, email: email }]);
    localStorage.setItem("emails", JSON.stringify(emails));
  };

  return (
    <>
      {/* Tab Metadata */}

      <Head>
        <title>BlastPad</title>
        <meta name="description" content="Prepare for launch!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header and Searchbar */}

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

        {/* Subsections */}

        <div className={styles.tiles}>
          <div
            className={styles.subsection}
            style={{ background: "var(--favoritesColor)" }}
          >
            <div className={styles.favorites}>
              <h2 className={styles.subheader}> Favorites </h2>
              <div className={styles.scrollBox}>
                <ul id="favoritesList" className={styles.list}>
                  {favorites &&
                    favorites.map((item) => (
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
                <ul id="emailsList" className={styles.list}>
                  {emails &&
                    emails.map((item) => (
                      <li>
                        <a href={"mailto:" + item.email} target="_blank">
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

          <div
            className={styles.subsection}
            style={{ background: "var(--toDoColor" }}
          >
            <div className={styles.toDo}>
              <h2 className={styles.subheader}> To-Do </h2>
              <div className={styles.scrollBox}></div>
              <button
                className={styles.button}
                onClick={() => setToDoPopup(true)}
              >
                Add Task
              </button>
            </div>
          </div>

          <div
            className={styles.subsection}
            style={{ background: "var(--notesColor" }}
          >
            <div className={styles.notes}>
              <h2 className={styles.subheader}> Notes </h2>
              <div className={styles.scrollBox}>
                <textarea
                  id="notes"
                  name="notes"
                  className={styles.textBox}
                ></textarea>
              </div>
            </div>
          </div>

          <div
            className={styles.subsection}
            style={{ background: "var(--historyColor" }}
          >
            <div className={styles.history}>
              <h2 className={styles.subheader}> Recent History </h2>
              <div className={styles.scrollBox}>
              </div>
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
            addMethod={addEmail}
          />
        )}
        {toDoPopup && (
          <AddTask
            closeMethod={() => setToDoPopup(false)}
            addMethod={addTask}
          />
        )}
      </main>
    </>
  );
}
