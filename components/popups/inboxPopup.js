import styles from "@/styles/Popup.module.css";
import {useState} from "react";

export default function InboxPopup() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <img
        onClick={() => setPopupOpen(true)}
        src={"mail.svg"}
        className={styles.popupTrigger}
        alt="Inbox Viewer"
      />
      {popupOpen && <div className={styles.fullscreen}>
        <div className={styles.popup}>
          <button onClick={() => setPopupOpen(false)} className={styles.close}>
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
        </div>
      </div>}
    </>

  );
}