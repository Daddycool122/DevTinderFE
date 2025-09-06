import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider, useSelector } from 'react-redux'
import { appStore } from './utils/appStore'
import Login from './components/Login'
import Feed from './components/Feed'
import Body from './components/Body'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'

function AppWrapper() {
  return (
    <Provider store={appStore}>
      <App />
    </Provider>
  )
}

function App() {
  const user = useSelector(store => store.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Body is parent layout */}
        <Route path="/" element={<Body />}>
          {/* Other routes inside Body */}
          <Route path="login" element={user ? <Navigate to="/feed" /> :  <Navigate to="/login" />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppWrapper;
