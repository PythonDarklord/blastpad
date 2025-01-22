import styles from "@/styles/Popup.module.css";
import defaultSettings from "@/public/defaultSettings.json";
import {useState} from "react";
import {useSettingsContext} from "@/components/settingsContext";

const updateSettings = (e, settings, setSettings) => {
  const id = e.target.id;
  setSettings((prevSettings) => ({
    ...prevSettings,
    [id]: {
      ...prevSettings[id],
      value: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    },
  }));
};

export default function SettingsPopup() {
  const {settings, setSettings} = useSettingsContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <img
        onClick={() => setSettingsOpen(true)}
        src={"settings.png"}
        className={styles.popupTrigger}
        alt="Settings Cog"
      />
      {settingsOpen && <div className={styles.fullscreen}>
        <div className={styles.popup}>
          <button onClick={() => setSettingsOpen(false)} className={styles.close}>
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
          <form
            className={styles.form}
            onChange={(e) => updateSettings(e, settings, setSettings)}
          >
            <h2>Settings</h2>
            <div>
              <label htmlFor="favoritesColor">Favorites Color: </label>
              <input
                className={styles.colorInput}
                type="color"
                id="favoritesColor"
                name="favoritesColor"
                defaultValue={settings.favoritesColor.value}
              ></input>
            </div>
            <div>
              <label htmlFor="emailColor">Email Color: </label>
              <input
                className={styles.colorInput}
                id="emailsColor"
                name="emailsColor"
                type="color"
                defaultValue={settings.emailsColor.value}
              ></input>
            </div>
            <div>
              <label htmlFor="toDoColor">To-Do Color: </label>
              <input
                className={styles.colorInput}
                id="todoColor"
                name="todoColor"
                type="color"
                defaultValue={settings.todoColor.value}
              ></input>
            </div>
            <div>
              <label htmlFor="notesColor">Notes Color: </label>
              <input
                className={styles.colorInput}
                id="notesColor"
                name="notesColor"
                type="color"
                defaultValue={settings.notesColor.value}
              ></input>
            </div>
            <div>
              <label htmlFor="draggableTiles">Drag and Drop: </label>
              <label className={styles.switch}>
                <input
                  checked={settings.draggableTiles.value}
                  type="checkbox"
                  id="draggableTiles"
                  name={"draggableTiles"}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </form>
          <div>
            <button onClick={() => setSettings(defaultSettings)} className={styles.button}>
              Reset to Default
            </button>
          </div>
          <div>
            <button onClick={() => localStorage.clear()} className={styles.button}> Clear all Data</button>
          </div>
        </div>
      </div>}
    </>
  );
}
