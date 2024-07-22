import styles from "@/styles/addFavorite.module.css";

export default function SettingsMenu( closeMethod, addMethod ) {
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
                <button>Apply</button>
            </div>
        </div>
    );
}