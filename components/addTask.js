import styles from "@/styles/Popup.module.css";

export default function AddTask({ closeMethod, addMethod }) {
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
        <form className={styles.form} onSubmit={(e) => addMethod(e)}>
          <h2>Add Task</h2>
          <div>
            <label htmlFor="name">Task Name: </label>
            <input id="name" name="name" type="text" required></input>
          </div>
          <div>
            <label>Priority: </label>
            <select id="priority" className={styles.dropdown}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <button>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
