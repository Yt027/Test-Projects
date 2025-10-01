import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center w-full p-12">
      <div className='w-2/3 flex items-center justify-center h-20 bg-primary- rounded-2xl'>
        <div>
          <input
            className='input input-bordered w-full max-w-xs'
            type="text" 
            name="" 
            id=""
          />
        </div>
      </div>
    </div>
  )
}

export default App
