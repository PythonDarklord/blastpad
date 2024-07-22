import styles from "@/styles/addFavorite.module.css";

export default function SettingsMenu( {closeMethod, applyMethod} ) {
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
                        <select id="favoritesColor" name="favoritesColor">
                            <option value="yellow">Yellow</option>
                            <option value="crimson">Crimson</option>
                            <option value="brown">Brown</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emailColor">Email Color: </label>
                        <select id="emailColor" name="emailColor">
                            <option value="yellow">Yellow</option>
                            <option value="crimson">Crimson</option>
                            <option value="brown">Brown</option>
                        </select>
                    </div>
                    <div>
                        <button>Apply</button>
                    </div>
                </form>
            </div>
        </div>
    );
}