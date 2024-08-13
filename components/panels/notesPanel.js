import styles from "@/styles/Home.module.css";
import {useEffect, useState} from "react";

const [notes, setNotes] = useState("");
const [loadedNotes, setLoadedNotes] = useState(false);

useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
    }
    setLoadedNotes(true);
},[]);

useEffect(() => {
    loadedNotes && localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);


const saveNotes = (e) => {
    const note = e.target.value;
    setNotes(note);
    localStorage.setItem("notes", JSON.stringify(note));
};


export default function NotesPanel() {
    return(
        <div
            className={styles.subsection}
            style={{background: settings.notesColor}}
        >
            <div className={styles.notes}>
                <h2 className={styles.subheader}> Notes </h2>
                <form className={styles.scrollBox}>
                <textarea
                    id="notes"
                    name="notes"
                    className={styles.textBox}
                    defaultValue={notes}
                    onChange={(e) => saveNotes(e)}
                ></textarea>
                </form>
            </div>
        </div>
    );
}