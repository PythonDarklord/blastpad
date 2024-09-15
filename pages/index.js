import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useEffect, useState} from "react";
import SettingsMenu from "@/components/settingsMenu";
import GamesMenu from "@/components/games";
import TileLayout from "@/components/tileLayout";
import SearchBar from "@/components/searchBar";
import AppsMenu from "@/components/appsMenu"

export default function Home() {
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [settings, setSettings] = useState({});
    const [loadedSettings, setLoadedSettings] = useState(false);
    const [gamesPopup, setGamesPopup] = useState(false);
    const [appsPopup, setAppsPopup] = useState(false);

    useEffect(() => {
        document.getElementById("query").focus();
    }, []);

    useEffect(() => {
        const storedSettings = JSON.parse(localStorage.getItem("settings"));
        if (storedSettings) {
            setSettings(storedSettings);
        } else {
            setSettings({
                'favoritesColor': '#75659c',
                'emailsColor': '#BFACC8',
                'notesColor': '#8b878f',
                'todoColor': '#783F8E',
                'draggableTiles': false
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

            {/* Header and Searchbar */}
            <main className={styles.main}>
                <img
                    onClick={() => setSettingsPopup(true)}
                    src={"settings.png"}
                    className={styles.settingsCog}
                    alt="Settings Cog"
                />
                <img
                    onClick={() => setAppsPopup(true)}
                    src={"apps.svg"}
                    className={styles.apps}
                    alt="Google Apps"
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
                <div className={styles.tileContainer}>
                    <TileLayout settings={settings}/>
                </div>
                <a style={{color: "white", backgroundColor: "gray", padding: "15px", borderRadius: "15px"}}
                   href={"https://www.venmo.com/u/PythonDarklord"}>
                    <div>
                        <h2>Buy a Dev a Coffee!</h2>
                    </div>
                </a>
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
                {appsPopup && (
                    <AppsMenu
                        closeMethod={() => setAppsPopup(false)}
                    />
                )}
            </main>
        </>
    );
}
