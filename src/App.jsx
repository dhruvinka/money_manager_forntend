import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Home from './component/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/income" element={<Income/>} />
      <Route path="/expense" element={<Expense/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/filter" element={<Filter/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
