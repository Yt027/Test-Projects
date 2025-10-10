import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { CircleOff, Trash } from 'lucide-react'
import './App.css'
import Sidebar from './components/sidebar';
import Todo from './pages/Todo';

function App() {
  const [view, setView] = useState("todo")

  function switchView(id) {
    setView(id)
  }
  return (
    <>
      <Sidebar onSwitch={switchView} />

      <main className="app m-2 mt-5 mr-17">
        <div hidden={view !== "todo" ? true : ""}>
          <Todo />
        </div>
      </main>
    </>
  )
}

export default App
