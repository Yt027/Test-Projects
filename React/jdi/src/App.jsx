import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { CircleOff, Trash } from 'lucide-react'
import './App.css'
import Sidebar from './components/sidebar';
import Todo from './pages/Todo';
import Stats from './pages/Stats';

function App() {
  const [view, setView] = useState("todo")

  function switchView(id) {
    setView(id)
  }
  return (
    <>
      <Sidebar onSwitch={switchView} />

      <main className="app m-2 mt-5 mr-17 max-w-150 ml-auto mr-auto overflow-x-hidden">
        <div hidden={view !== "todo" ? true : ""}>
          <Todo />
        </div>

        <div hidden={view !== "stats" ? true : ""}>
          <Stats />
        </div>
      </main>
    </>
  )
}

export default App
