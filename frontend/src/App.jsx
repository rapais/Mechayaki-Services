import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default function App() {
  const [health, setHealth] = useState(null);
  const [stalls, setStalls] = useState([]);

  useEffect(() => {
    // Fetch health status
    fetch('http://localhost:8080/api/health')
      .then(r => r.json())
      .then(setHealth)
      .catch(console.error);

    // Fetch stalls data
    fetch('http://localhost:8080/api/stalls')
      .then(r => r.json())
      .then(setStalls)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Mechayaki</h1>
      <p>Health Status: {health ? health.status : "loading..."}</p>

      <h2>Stalls</h2>
      <pre>{JSON.stringify(stalls, null, 2)}</pre>
    </div>
  );
}