import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import AddFavorite from "@/components/addFavorite";
import SettingsMenu from "@/components/settingsMenu";
import settingsMenu from "@/components/settingsMenu";
import AddEmail from "@/components/addEmail";
import addEmail from "@/components/addEmail";
import AddTask from "@/components/addTask";
import addTask from "@/components/addTask";

export default function Home() {
  const [favoritePopup, setFavoritePopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [emails, setEmails] = useState([]);
  const [toDoPopup, setToDoPopup] = useState(false);


  //W3Schools Cookie Code (Andy take a look)

  // function setCookie(cname, cvalue, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays*24*60*60*1000));
  //   let expires = "expires="+ d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }

  // function getCookie(cname) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(';');
  //   for(let i = 0; i <ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // function checkCookie() {
  //   let user = getCookie("username");
  //   if (user != "") {
  //     alert("Welcome again " + user);
  //   } else {
  //     user = prompt("Please enter your name:", "");
  //     if (user != "" && user != null) {
  //       setCookie("username", user, 365);
  //     }
  //   }
  // }



  useEffect(() => {
    document.getElementById("query").focus();
  });

  useEffect(() => {
    const cookiesFav = document.cookie;
    if (cookiesFav.includes("favorites")) {
      const cookiesList = cookiesFav.split(";");
      const favoritesCookie = cookiesList
        .filter((item) => item.includes("favorites="))[0]
        .replace("favorites=", "");
      const favoritesCookieData = JSON.parse(favoritesCookie);
      setFavorites(favoritesCookieData);
    } else {
      document.cookie = "favorites = []";
    }

    const cookiesEm = document.cookie[1];
    if (cookiesEm.includes("emails")) {
      const cookiesList = cookiesEm.split(";");
      const emailsCookie = cookiesList
        .filter((item) => item.includes("emails="))[0]
        .replace("emails", "");
      const emailsCookieData = JSON.parse(emailsCookie);
      setFavorites(emailsCookieData);
    } else {
      document.cookie = "emails = []";
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
                <ul id="emailsList" className={styles.list}>
                  {emails.map((item) => (
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
              <div className={styles.scrollBox}>
                
              </div>
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
                
              </div>
              <button 
              className={styles.button}>
                Add Note
              </button>
            </div>
          </div>

          <div
            className={styles.subsection}
            style={{ background: "var(--historyColor" }}
          >
            <div className={styles.history}>
              <h2 className={styles.subheader}> Recent History </h2>
              <div className={styles.scrollBox}>
                  <ul >
                    window.history()
                  </ul>
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
