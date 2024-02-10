import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthForm } from './components/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <NextUIProvider className='p-8 lg:p-0 h-full grid'>
    <Routes>
      <Route path="/login" element={<AuthForm/>}></Route>
      <Route path='/' element={<App/>}></Route>
    </Routes>
  </NextUIProvider>
  </BrowserRouter>
)
