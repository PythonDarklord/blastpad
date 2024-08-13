import styles from "@/styles/Table.module.css"


export default function TaskTable(tasks, checkStatus) {
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
                            onClick={(e) => checkStatus(e, item.name)}
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