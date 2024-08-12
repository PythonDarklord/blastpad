import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useState, useEffect} from "react";
import AddFavorite from "@/components/addFavorite";
import SettingsMenu from "@/components/settingsMenu";
import AddEmail from "@/components/addEmail";
import AddTask from "@/components/addTask";
import {Html} from "next/document";

export default function Home() {
    const [favoritePopup, setFavoritePopup] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [loadedFavorites, setLoadedFavorites] = useState(false);
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [emailPopup, setEmailPopup] = useState(false);
    const [emails, setEmails] = useState([]);
    const [loadedEmails, setLoadedEmails] = useState(false);
    const [toDoPopup, setToDoPopup] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loadedTasks, setLoadedTasks] = useState(false);
    const [notes, setNotes] = useState("");
    const [loadedNotes, setLoadedNotes] = useState(false);
    const [panelColors, setPanelColors] = useState({});
    const [loadedPanelColors, setLoadedPanelColors] = useState(false);
    const [settings, setSettings] = useState({});
    const [loadedSettings, setLoadedSettings] = useState(false);

    useEffect(() => {
        document.getElementById("query").focus();
    }, []);

    useEffect(() => {
        const storedSettings = JSON.parse(localStorage.getItem("settings"));
        if (storedSettings) {
            setSettings(storedSettings);
        } else {
            setSettings({
                'favoritesColor': '#ffffff',
                'emailsColor': '#ffffff',
                'notesColor': '#ffffff',
                'todoColor': '#ffffff'
            });
        }
        setLoadedSettings(true)
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            setFavorites(parsedFavorites);
        }
        setLoadedFavorites(true);

        const storedEmails = localStorage.getItem("emails");
        if (storedEmails) {
            const parsedEmails = JSON.parse(storedEmails);
            setEmails(parsedEmails);
        }
        setLoadedEmails(true);

        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
            console.log(tasks);
        }
        setLoadedTasks(true);

        const storedPanelColors = localStorage.getItem("panelColors");
        if (storedPanelColors) {
            const parsedPanelColors = JSON.parse(storedPanelColors);
            setPanelColors(parsedPanelColors);
        } else {
            setPanelColors({
                "favoritesColor": "#9a8a4e",
                "emailsColor": "#a54040",
                "toDoColor": "#5dc55d",
                "notesColor": "#6880ce"
            });
        }
        setLoadedPanelColors(true);

        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            const parsedNotes = JSON.parse(storedNotes);
            setNotes(parsedNotes);
        }
        setLoadedNotes(true);
    }, []);

    useEffect(() => {
        loadedSettings && localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        loadedFavorites &&
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        loadedEmails && localStorage.setItem("emails", JSON.stringify(emails));
    }, [emails]);

    useEffect(() => {
        loadedTasks && localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        loadedPanelColors &&
        localStorage.setItem("panelColors", JSON.stringify(panelColors));
    }, [panelColors]);

    useEffect(() => {
        loadedNotes && localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

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

    const addFavorite = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const url = e.target.url.value;
        setFavoritePopup(false);
        setFavorites([...favorites, {name: name, url: url}]);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const addEmail = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        setEmailPopup(false);
        setEmails([...emails, {name: name, email: email}]);
        localStorage.setItem("emails", JSON.stringify(emails));
    };

    const addTask = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const priority = e.target.priority.value;
        const getStatus = false;
        setToDoPopup(false);
        setTasks([...tasks, {name: name, priority: priority, status: getStatus}]);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const checkStatus = (e, name) => {
        const status = e.target.checked;
        const newTasks = tasks.map((item) =>
            item.name === name ? {...item, status: status} : item,
        );
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    const saveNotes = (e) => {
        const note = e.target.value;
        setNotes(note);
        localStorage.setItem("notes", JSON.stringify(note));
    };

    const setColor = (e) => {
        e.preventDefault();
        const favoritesColor = e.target.favoritesColor.value;
        const emailsColor = e.target.emailsColor.value;
        const toDoColor = e.target.toDoColor.value;
        const notesColor = e.target.notesColor.value;
        setSettingsPopup(false);
        changeColor(favoritesColor, "favorites");
        changeColor(emailsColor, "emails");
        changeColor(toDoColor, "toDo");
        changeColor(notesColor, "notes");
    };

    const changeColor = (color, panel) => {
        let r = document.querySelector(":root");
        let panelColor = panel + "Color";
        r.style.setProperty("--" + panelColor, color);
        //Only runs for the notesColor
        setPanelColors([...panelColors, {name: panelColor, color: color}]);
        localStorage.setItem("panelColors", JSON.stringify(panelColors));
    };

    const color = {
        getHex(panelName) {
            // let r = document.querySelector(":root");
            // const colorVar = "--" + panelName;
            // const panelColor = r.style;
            // console.log(panelColor[0]);
            // console.log(panelColor);
            const panelColor = panelName + "Color";
            const gotItem = localStorage.getItem("panelColors");
            console.log(gotItem);
        },
    };

    return (
        <>
            {/* Tab Metadata */}

            <Head>
                <title>BlastPad</title>
                <meta name="description" content="Prepare for launch!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
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

                {/* Subsections */}

                <div className={styles.tiles}>
                    <div
                        className={styles.subsection}
                        style={{background: "var(--favoritesColor)"}}
                    >
                        <div className={styles.favorites}>
                            <h2 className={styles.subheader}> Favorites </h2>
                            <div className={styles.scrollBox}>
                                <ul id="favoritesList" className={styles.list}>
                                    {favorites &&
                                        favorites.map((item, index) => (
                                            <li key={index}>
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
                        style={{background: panelColors.emailsColor}}
                    >
                        <div className={styles.emails}>
                            <h2 className={styles.subheader}> Emails </h2>
                            <div className={styles.scrollBox}>
                                <ul id="emailsList" className={styles.list}>
                                    {emails &&
                                        emails.map((item, index) => (
                                            <li key={index}>
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
                        style={{background: panelColors.toDoColor}}
                    >
                        <div className={styles.toDo}>
                            <h2 className={styles.subheader}> To-Do </h2>
                            <div className={styles.scrollBox}>
                                <table id="tasksTable" className={styles.table}>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tasks &&
                                        tasks.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.priority}</td>
                                                <td>
                                                    <input
                                                        name="status"
                                                        id="status"
                                                        type="checkbox"
                                                        onClick={(e) => checkStatus(e, item.name)}
                                                        checked={item.status}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                        style={{background: "var(--notesColor"}}
                    >
                        <div className={styles.notes}>
                            <h2 className={styles.subheader}> Notes </h2>
                            <form className={styles.scrollBox}>
                <textarea
                    id="notes"
                    name="notes"
                    className={styles.textBox}
                    defaultValue={notes}
                    onChange={(e) => saveNotes(e)}
                ></textarea>
                            </form>
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
                        settings={settings}
                        setSettings={setSettings}
                        panelColors={panelColors}
                        setPanelColors={setPanelColors}
                        closeMethod={() => setSettingsPopup(false)}
                        applyMethod={setColor}
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
