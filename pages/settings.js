import {useEffect, useState} from "react";
import defaultSettings from "@/public/defaultSettings.json";
import styles from "@/styles/settings.module.css";

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [loadedSettings, setLoadedSettings] = useState(false);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("settings"));
    if (storedSettings) {
      setSettings(storedSettings);
    } else {
      setSettings(defaultSettings);
    }
    setLoadedSettings(true)
  }, []);

  useEffect(() => {
    loadedSettings && localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    let value;
    type === "checkbox" ? value = e.target.checked : value = e.target.value;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: {
        ...prevSettings[name],
        value: value
      }
    }));
  }

  return (
    <>
      <h1 className={styles.title}>Settings</h1>
      <form onChange={handleChange} className={styles.settingsForm}>
        {Object.keys(settings).map((key) => (
          <div key={key} className={styles.settingsFormItem}>
            <label htmlFor={key}>{key}</label>
            <input type={settings[key].type} name={key} id={key} value={settings[key].value}
                   checked={settings[key].value}/>
          </div>
        ))}
      </form>
      <button onClick={() => setSettings(defaultSettings)}>Reset</button>
    </>
  );
}