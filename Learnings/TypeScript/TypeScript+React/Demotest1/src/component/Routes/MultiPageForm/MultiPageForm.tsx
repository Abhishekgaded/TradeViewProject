
import RootLayout from './RootLayout'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Profile from './Profile'
import Dashboard from './Dashboard'
import Settings from './Settings'
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
