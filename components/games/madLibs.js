import styles from "@/styles/Popup.module.css";

export default function MadLibs ({closeMethod}) {

    let text = "Enter your name: "

    const checkEnter = (e) => {
        if (e.key === "Enter") {
            text = "Thank you"
        }
        return text;
    }

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
                <h2>Mad Libs</h2>
                <textarea value = {text} id={'inputArea'} disabled>
                </textarea>
                <input id="input" type={"text"} onKeyDown={(e) => checkEnter(e)}></input>
                </div>
        </div>
    );
}