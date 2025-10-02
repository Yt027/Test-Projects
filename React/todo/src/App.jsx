import { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState(0) // 0 = All, 1 = basse, 2 = moyenne, 3 = urgente
  const [priority, setPriority] = useState(2) // 0 = All, 1 = basse, 2 = moyenne, 3 = urgente
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // New Task
  function addTask() {
    const newTask = {
      id: Math.random(),
      title: input,
      priority: priority,
      finished: false
    }

    setTasks([...tasks, newTask])
    setInput('')
    setPriority(2)
  }

  // Removing task
  function deleteTask(id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  // Toggle task
  function toggleTask(id) {
    return function() {
      const newTasks = tasks.map(task => {
        if(task.id === id) {
          return {
            ...task,
            finished: !task.finished
          }
        }
        return task
      })
      setTasks(newTasks)
    }
  }

  return (
    <div className="flex justify-center w-full p-12 md:p-6">
      <div className='w-2/3 lg:w-5/6 p-5 flex flex-col gap-5 bg-base-300 rounded-2xl'>
        <div className='flex items-center gap-3 justify-between w-full'>
          <input
            className='input flex-1'
            placeholder="Ajouter une tâche"
            type="text" 
            name="" 
            id=""
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <select
            className='select w-50'
            defaultValue={2}
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            type="text"
            name="" 
            id=""
          >
            <option value="3">Urgente</option>
            <option value="2">Moyenne</option>
            <option value="1">Basse</option>
          </select>

          <button 
            className='btn btn-primary m-l-auto'
            onClick={addTask}
            >Ajouter</button>
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          <button
          className={filter == 0 ? 'btn btn-primary' : 'btn btn-soft'}
          onClick={() => setFilter(0)}
          >Toutes</button>
          
          <button
          className={filter == 3 ? 'btn btn-primary' : 'btn btn-soft'}
          onClick={() => setFilter(3)}
          >Urgente</button>

          <button
          className={filter == 2 ? 'btn btn-primary' : 'btn btn-soft'}
          onClick={() => setFilter(2)}
          >Moyenne</button>

          <button
          className={filter == 1 ? 'btn btn-primary' : 'btn btn-soft'}
          onClick={() => setFilter(1)}
          >Basse</button>
        </div>

        <div className='flex flex-col gap-3'>
          {tasks.map(task => {
            if(filter == 0 || filter == task.priority) {
              return (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <input 
                      className='checkbox checkbox-primary checkbox-sm'
                      checked={task.finished}
                      onChange={toggleTask(task.id)}
                      type="checkbox" 
                      name="" 
                      id=""
                    />

                    <span className='text-sm'>{task.title}</span>
                  </div>

                  <button 
                    className='btn btn-soft btn-sm'
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash className='w-4 h-4 text-red-500' />
                  </button>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default App
