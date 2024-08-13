import styles from "@/styles/Panel.module.css"
import {useEffect, useState} from "react";
import AddTask from "@/components/addTask";

const [toDoPopup, setToDoPopup] = useState(false);
const [tasks, setTasks] = useState([]);
const [loadedTasks, setLoadedTasks] = useState(false);

useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        console.log(tasks);
    }
    setLoadedTasks(true);
})

useEffect(() => {
    loadedTasks && localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

const addTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const priority = e.target.priority.value;
    const getStatus = false;
    setToDoPopup(false);
    setTasks([...tasks, {name: name, priority: priority, status: getStatus}]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const checkStatus = (e, name, tasks, setTasks) => {
    const status = e.target.checked;
    const newTasks = tasks.map((item) =>
        item.name === name ? {...item, status: status} : item,
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
};

export function TaskTable(tasks, setTasks) {
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

export default function TaskPanel() {
    return (
        <>
        <div
            className={styles.subsection}
            style={{background: settings.todoColor}}
        >
            <div className={styles.toDo}>
                <h2 className={styles.subheader}> To-Do </h2>
                <div className={styles.scrollBox}>
                    <TaskTable
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </div>
                <button
                    className={styles.button}
                    onClick={() => setToDoPopup(true)}
                >
                    Add Task
                </button>
            </div>
        </div>
        {toDoPopup && (
            <AddTask
                closeMethod={() => setToDoPopup(false)}
                addMethod={addTask}
            />
        )}
            </>
    );
}