import styles from "@/styles/Popup.module.css";
import defaultSettings from "@/public/defaultSettings.json";

const updateSettings = (e, settings, setSettings, checked) => {
    const id = e.target.id;
    let value = e.target.value;
    if (id === "draggableTiles") {
        value = checked;
    }
    const updatedSettings = {
        ...settings, [id]: value,
    };
    setSettings(updatedSettings);
};

export default function SettingsMenu({closeMethod, setSettings, settings}) {

    let checked = settings.draggableTiles;

    return (<div className={styles.fullscreen}>
        <div className={styles.popup}>
            <button onClick={closeMethod} className={styles.close}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <form className={styles.form} onChange={(e) => updateSettings(e, settings, setSettings, checked)}>
                <h2>Settings</h2>
                <div>
                    <label htmlFor="favoritesColor">Favorites Color: </label>
                    <input className={styles.colorInput} type="color" id="favoritesColor" name="favoritesColor"
                           defaultValue={settings.favoritesColor}></input>
                </div>
                <div>
                    <label htmlFor="emailColor">Email Color: </label>
                    <input className={styles.colorInput} id="emailsColor" name="emailsColor" type="color"
                           defaultValue={settings.emailsColor}></input>
                </div>
                <div>
                    <label htmlFor="toDoColor">To-Do Color: </label>
                    <input className={styles.colorInput} id="todoColor" name="todoColor" type="color"
                           defaultValue={settings.todoColor}></input>
                </div>
                <div>
                    <label htmlFor="notesColor">Notes Color: </label>
                    <input className={styles.colorInput} id="notesColor" name="notesColor" type="color"
                           defaultValue={settings.notesColor}></input>
                </div>
                <div>
                    <label htmlFor="draggableTiles">Drag and Drop: </label>
                    <label className={styles.switch}>
                        <input checked={settings.draggableTiles} type="checkbox" id="draggableTiles"
                               name={"draggableTiles"} onClick={() => checked = !checked}/>
                            <span className={styles.slider}></span>
                    </label>
                </div>

                <div>
                    <button onClick={() => setSettings(defaultSettings)}> Reset to
                        Default
                    </button>
                </div>
                <div>
                    <button onClick={() => localStorage.clear()}> Clear all Data
                    </button>
                </div>
            </form>
        </div>
    </div>);
}
