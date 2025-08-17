import { useState } from 'react'
import React from 'react'
import Login from './components/Login'
import Body from './components/Body'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Body />} >
             <Route path="/login" element={<Login />} />
      </Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
