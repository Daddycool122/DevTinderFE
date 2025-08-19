import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider, useSelector } from 'react-redux'
import { appStore } from './utils/appStore'
import Login from './components/Login'
import Feed from './components/Feed'
import Body from './components/Body'
import Profile from './components/Profile'

function AppWrapper() {
  return (
    <Provider store={appStore}>
      <App />
    </Provider>
  )
}

function App() {
  const user = useSelector(store => store.user); // ✅ safe here because inside Provider

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={user?<Feed/>:<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppWrapper;
