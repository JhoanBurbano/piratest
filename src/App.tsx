import { Outlet } from 'react-router-dom'
import './App.scss'

function App() {

  return (
    <>
    <div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
    </>
  )
}

export default App
