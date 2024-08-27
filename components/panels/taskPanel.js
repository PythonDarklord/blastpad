import styles from "@/styles/Panel.module.css"
import {useEffect, useState} from "react";
import AddTask from "@/components/addTask";

const addTask = (e, setToDoPopup, setTasks, tasks) => {
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

export default function TaskPanel({color}) {

  const [toDoPopup, setToDoPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadedTasks, setLoadedTasks] = useState(false);

  return (
    <>
      <div
        className={styles.subsection}
        style={{background: color}}
      >
        <h2 className={styles.subheader}> To-Do </h2>
        <div className={styles.scrollBox}>
          {/*{tasks && ( <TaskTable*/}
          {/*    tasks={tasks}*/}
          {/*    setTasks={setTasks}*/}
          {/*    setLoadedTasks={setLoadedTasks}*/}
          {/*    loadedTasks={loadedTasks}*/}
          {/*/>)}*/}
        </div>
        <button
          className={styles.button}
          onClick={() => setToDoPopup(true)}
        >
          Add Task
        </button>
      </div>
      {toDoPopup && (
        <AddTask
          closeMethod={() => setToDoPopup(false)}
          addMethod={() => addTask(setToDoPopup, setTasks, tasks)}
        />
      )}
    </>
  );
}

export function TaskTable(setTasks, tasks, setLoadedTasks, loadedTasks) {

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
        (tasks.map((item, index) => (
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
        )))}
      </tbody>
    </table>
  );
}
