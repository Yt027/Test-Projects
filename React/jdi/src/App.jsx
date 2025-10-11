import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { CircleOff, Trash } from 'lucide-react'
import './App.css'
import Sidebar from './components/sidebar';
import Todo from './pages/Todo';
import Stats from './pages/Stats';
import Historic from './pages/Historic';
import User from './pages/User';
import Home from './pages/Home';

function App() {
  const [view, setView] = useState("home")

  function switchView(id) {
    setView(id)
  }
  return (
    <>
      <Sidebar view={view} onSwitch={switchView} />

      <main className="app flex justify-center h-[min(100vh,1000px)]">
        <section className="view max-w-150  m-2 mt-5 mr-17 overflow-x-hidden">
          <div className='h-full flex' hidden={view !== "home" ? true : ""}>
            <Home />
          </div>

          <div hidden={view !== "todo" ? true : ""}>
            <Todo />
          </div>

          <div hidden={view !== "historic" ? true : ""}>
            <Historic />
          </div>

          <div hidden={view !== "stats" ? true : ""}>
            <Stats />
          </div>

          <div className='h-full flex' hidden={view !== "user" ? true : ""}>
            <User />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
