
import RootLayout from '../Component/RootLayout'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/Home'
import About from '../Component/About'
import Contact from '../Component/Contact'
import Profile from '../Component/Profile'
import Dashboard from '../Component/Dashboard'
import Settings from '../Component/Settings'
const MultiPageForm = () => {
  return (
    <div>
      <h1>Multi Page Form </h1>
      <Routes>
        <Route element={<RootLayout />} >
          <Route element={<Home />} path='/' />
          <Route element={<About />} path='/about' />
          <Route element={<Contact />} path='/contact' />
          <Route element={<Dashboard />} path='/dashboard' >
            <Route element={<Settings />} path='settings' />
            <Route element={<Profile />} path='profile' />
          </Route>
        </Route>
      </Routes>

    </div>
  )
}

export default MultiPageForm
