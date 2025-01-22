import {createContext, useContext, useEffect, useState} from "react";
import defaultSettings from "@/public/defaultSettings.json";

const settingsContext = createContext({});

const SettingsContext = ({children}) => {
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

  return (
    <settingsContext.Provider value={{settings, setSettings}}>
      {children}
    </settingsContext.Provider>
  )
}

const useSettingsContext = () => {
  const {settings, setSettings} = useContext(settingsContext);
  return {settings, setSettings};
}

export {SettingsContext, useSettingsContext};