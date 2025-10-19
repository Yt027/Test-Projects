import { useState, useEffect } from "react";
import { Trash } from "lucide-react";

function Todo() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(2);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const newTask = {
      name: input.trim(),
      priority: priority,
      done: false,
      registration: Date.now(),
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setPriority(2);
  }

  function toggleTask(id) {
    return function () {
      const newTasks = tasks.map((task) => {
        if (task.registration === id) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      });
      setTasks(newTasks);
    };
  }

  function removeTask(id) {
    const newTasks = tasks.filter((task) => task.registration !== id);
    setTasks(newTasks);
  }

  const todaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.registration);
    const today = new Date();
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear() ||
      task.done === false
    );
  });

  return (
    <div className="todo relative flex flex-col gap-6 bg-base-300 min-h-30 rounded-2xl">
      <div className="top-panel z-1000 sticky top-0 left-0 rounded-2xl bg-base-300 p-3 flex flex-col gap-4">
        {/* Input Section */}
        <div className="flex gap-3">
          <input
            className="input bordered"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nouvelle tâche"
            type="text"
            name=""
            id=""
          />

          <select
            className="select min-w-10 w-45"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            name=""
            id=""
          >
            <option value="3">Urgente</option>
            <option value="2">Moyenne</option>
            <option value="1">Basse</option>
          </select>

          <button className="btn btn-primary" type="button" onClick={addTask}>
            Ajouter
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-3">
          <button
            className={`btn btn-sm btn-soft ${
              filter === 0 ? "btn-primary" : ""
            }`}
            type="button"
            onClick={() => setFilter(0)}
          >
            Tout
          </button>

          <button
            className={`btn btn-sm btn-soft ${
              filter === 3 ? "btn-primary" : ""
            }`}
            type="button"
            onClick={() => setFilter(3)}
          >
            Urgente
          </button>

          <button
            className={`btn btn-sm btn-soft ${
              filter === 2 ? "btn-primary" : ""
            }`}
            type="button"
            onClick={() => setFilter(2)}
          >
            Moyenne
          </button>

          <button
            className={`btn btn-sm btn-soft ${
              filter === 1 ? "btn-primary" : ""
            }`}
            type="button"
            onClick={() => setFilter(1)}
          >
            Basse
          </button>
        </div>
      </div>

      {/* Task list */}
      <ul className="flex flex-col gap-4 p-3">
        {todaysTasks.map((task) => {
          if (filter == 0 || filter == task.priority) {
            return (
              <li
                className="item flex gap-3 items-center  bg-base-100 p-3 rounded-xl"
                key={task.registration}
              >
                <input
                  className="checkbox checkbox-primary checkbox-sm"
                  type="checkbox"
                  checked={task.done}
                  onChange={toggleTask(task.registration)}
                  name=""
                  id=""
                />

                <span className="name text-sm font-semibold">{task.name}</span>

                <span
                  className={`badge badge-${
                    task.priority == 3
                      ? "error"
                      : task.priority == 2
                      ? "warning"
                      : "soft"
                  }`}
                >
                  {task.priority == 3
                    ? "Urgente"
                    : task.priority == 2
                    ? "Moyenne"
                    : "Basse"}
                </span>

                <div
                  className="delete btn btn-error btn-sm ml-auto"
                  onClick={() => removeTask(task.registration)}
                >
                  <Trash className="w-4 h-4" />
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Todo;
