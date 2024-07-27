import styles from "@/styles/Popup.module.css";

let r = document.querySelector(":root");

const color = {

  getHex(panelName){
    const colorVar = "--" + panelName;
    const panelColor = r.getElementsByClassName(colorVar);
    console.log(panelColor);
  }
};

export default function SettingsMenu({ closeMethod, applyMethod }) {
  return (
    <div className={styles.fullscreen}>
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
        <form className={styles.form} onSubmit={(e) => applyMethod(e)}>
          <h2>Settings</h2>
          <div>
            <label htmlFor="favoritesColor">Favorites Color: </label>
            <input className={styles.colorInput} type="color" id="favoritesColor" name="favoritesColor" defaultValue={color.getHex("favoritesColor")}></input>
          </div>
          <div>
            <label htmlFor="emailColor">Email Color: </label>
            <input className={styles.colorInput} id="emailColor" name="emailColor" type="color" defaultValue={"#a54040"}></input>
          </div>
          <div>
            <label htmlFor="toDoColor">To-Do Color: </label>
            <input className={styles.colorInput} id="toDoColor" name="toDoColor" type="color" defaultValue={"#5dc55d"}></input>
          </div>
          <div>
            <label htmlFor="notesColor">Notes Color: </label>
            <input className={styles.colorInput} id="notesColor" name="notesColor" type="color" defaultValue={"#6880ce"}></input>
          </div>
          <div>
            <button>Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
}
