import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useEffect} from "react";
import SettingsPopup from "@/components/popups/settingsPopup";
import GamesPopup from "@/components/popups/gamesPopup";
import TileLayout from "@/components/tileLayout";
import SearchBar from "@/components/searchBar";
import AppsPopup from "@/components/popups/appsPopup"
import InboxPopup from "@/components/popups/inboxPopup"
import {SettingsContext} from "@/components/settingsContext";

export default function Home() {

  useEffect(() => {
    document.getElementById("query").focus();
  }, []);

  return (
    <>
      {/* Tab Metadata */}
      <Head>
        <title>BlastPad</title>
        <meta name="description" content="Prepare for launch!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.svg"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-84FXE5M316"></script>
        <script id={"google-analytics"}>
          {
            '                    window.dataLayer = window.dataLayer || [];\n' +
            '                    function gtag(){dataLayer.push(arguments);}\n' +
            '                    gtag(\'js\', new Date());\n' +
            '\n' +
            '                    gtag(\'config\', \'G-84FXE5M316\');'
          }

        </script>
      </Head>
      <SettingsContext>
        {/* Header and Searchbar */}
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.popupTriggerContainer}>
              <SettingsPopup/>
              <AppsPopup/>
            </div>
            <h1 className={styles.title}> BlastPad </h1>
            <div className={styles.popupTriggerContainer}>
              <InboxPopup/>
              <GamesPopup/>
            </div>
          </header>
          <SearchBar/>
          <div className={styles.tileContainer}>
            <TileLayout/>
          </div>
          <a className={styles.coffee}
             href={"https://www.venmo.com/u/PythonDarklord"}>
            <div>
              <img src={"coffee.svg"} alt="Coffee Logo"/>
              <h2>Buy us a Coffee?</h2>
            </div>
          </a>
        </main>
      </SettingsContext>
    </>
  );
}
