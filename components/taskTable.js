import styles from "@/styles/Table.module.css"

const checkStatus = (e, name, tasks, setTasks) => {
    const status = e.target.checked;
    const newTasks = tasks.map((item) =>
        item.name === name ? {...item, status: status} : item,
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
};

export default function TaskTable(tasks, setTasks) {
    return (
    <table id="tasksTable" className={styles.table}>
        <thead>
        <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {tasks &&
            tasks.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.priority}</td>
                    <td>
                        <input
                            name="status"
                            id="status"
                            type="checkbox"
                            onClick={(e) => checkStatus(e, item.name, tasks, setTasks)}
                            checked={item.status}
                        />
                    </td>
                    <td>
                        <button> Remove</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    );
}