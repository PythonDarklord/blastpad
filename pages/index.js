import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useEffect, useState} from "react";
import SettingsMenu from "@/components/settingsMenu";
import TaskPanel from "@/components/panels/taskPanel"
import FavoritesPanel from "@/components/panels/favoritesPanel"
import EmailsPanel from "@/components/panels/emailsPanel"
import NotesPanel from "@/components/panels/notesPanel"
import GamesMenu from "@/components/games";
import SearchBar from "@/components/searchBar";

export default function Home() {
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [settings, setSettings] = useState({});
  const [loadedSettings, setLoadedSettings] = useState(false);
  const [gamesPopup, setGamesPopup] = useState(false);

  useEffect(() => {
    document.getElementById("query").focus();
  }, []);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("settings"));
    if (storedSettings) {
      setSettings(storedSettings);
    } else {
      setSettings({
        'favoritesColor': '#F6D454',
        'emailsColor': '#a54040',
        'notesColor': '#5dc55d',
        'todoColor': '#6880ce'
      });
    }
    setLoadedSettings(true)
  }, []);


  useEffect(() => {
    loadedSettings && localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <>
      {/* Tab Metadata */}
      <Head>
        <title>BlastPad</title>
        <meta name="description" content="Prepare for launch!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.svg"/>
      </Head>
      {/* Header and Searchbar */}
      <main className={styles.main}>
        <img
          onClick={() => setSettingsPopup(true)}
          src={"settings.png"}
          className={styles.settingsCog}
          alt="Settings Cog"
        />
        <img
          onClick={() => setGamesPopup(true)}
          src={"games.png"}
          className={styles.gamesButton}
          alt="Games Button"
        />
        <header className={styles.header}>
          <h1 className={styles.title}> BlastPad </h1>
        </header>
        <SearchBar/>

        {/* Subsections */}

        <div className={styles.tiles}>
          <FavoritesPanel
            color={settings.favoritesColor}
          />

          <EmailsPanel
            color={settings.emailsColor}
          />

          <TaskPanel
            color={settings.todoColor}
          />

          <NotesPanel
            color={settings.notesColor}
          />
        </div>

        {settingsPopup && (
          <SettingsMenu
            settings={settings}
            setSettings={setSettings}
            closeMethod={() => setSettingsPopup(false)}
          />
        )}
        {gamesPopup && (
          <GamesMenu
            closeMethod={() => setGamesPopup(false)}
          />
        )}
      </main>
    </>
  );
}
