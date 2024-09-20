import styles from "@/styles/Panel.module.css"
import {useEffect, useState} from "react";
import AddTask from "@/components/addTask";


export default function TaskPanel({color}) {

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
  }, [])

  useEffect(() => {
    loadedTasks && localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const checkStatus = (e, name) => {
    const status = e.target.checked;
    const newTasks = tasks.map((item) =>
        item.name === name ? {...item, status: status} : item,
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const priority = e.target.priority.value;
    const getStatus = false;
    setToDoPopup(false);
    setTasks([...tasks, {name: name, priority: priority, status: getStatus}]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <>
      <div
        className={styles.subsection}
        style={{background: color}}
      >
        <h2 className={styles.subheader}> To-Do </h2>
        <div className={styles.scrollBox}>
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
                      onClick={(e) => checkStatus(e, item.name)}
                      checked={item.status}
                    />
                  </td>
                  <td>
                    <button onClick={() => {
                      const updatedTasks = tasks.filter(task => task.name !== item.name)
                      setTasks(updatedTasks)
                      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
                    }}>Remove</button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
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
          addMethod={addTask}
        />
      )}
    </>
  );
}
