import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (<>
    <Header active={1} />
    <div className="App select-none">
      <div className='grid grid-cols-2 gap-4 justify-items-center max-w-xs m-auto'>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
        </div>
        <div>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <h1 className='font-black text-6xl antialiased'>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className='p-5 pt-3 pb-3 dark:bg-zinc-700'>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  </>
  )
}

export default App
