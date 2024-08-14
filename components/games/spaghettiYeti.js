import styles from "@/styles/Popup.module.css";

export default function SpaghettiYeti ({closeMethod}) {

    return (
        <div className={styles.fullscreen}>
            <div className={styles.gameScreen}>
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
                <h2>Spaghetti Yeti</h2>
                <iframe src="https://itch.io/embed-upload/9953694?color=878351" allowFullScreen="true"
                        width="900" height="550"><a href="https://pythondarklord.itch.io/spaghetti-yeti">Play Spaghetti
                    Yeti on itch.io</a></iframe>
            </div>
        </div>
    );
}