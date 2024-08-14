import styles from "@/styles/Panel.module.css";
import {useEffect, useState} from "react";


export default function NotesPanel({color}) {

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

    return(
        <div
            className={styles.subsection}
            style={{background: color}}
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