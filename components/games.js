import styles from "@/styles/Popup.module.css";


export function madLibs () {
    return(
    <div className={styles.gameScreen}>
        <h2>Mad Libs</h2>
    </div>
    );
};

export default function GamesMenu ({closeMethod}){
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
                <h1> Games </h1>
                <button className={styles.button} onClick={madLibs}> Mad Libs </button>
            </div>
        </div>
    );
}