
import { Routes, Route } from 'react-router-dom'
import RootLayout from '../Routes/MultiPageForm/RootLayout'
import Home from '../Routes/MultiPageForm/Home'
import About from '../Routes/MultiPageForm/About'
import Contact from '../Routes/MultiPageForm/Contact'
import Login from './AuthenticationalPages/login'
import ProtectedRoute from './AuthenticationalPages/ProtectedRoute'
import Profile from '../Routes/MultiPageForm/Profile'
import Settings from '../Routes/MultiPageForm/Settings'
import DashboardLayout from '../Routes/MultiPageForm/Dashboard'

const CustomAppForMultiPage = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
      </Route>

      <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} ></Route>
      <Route path='/dashboard/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} ></Route>
      <Route path='/dashboard/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} ></Route>

    </Routes >
  )
}

export default CustomAppForMultiPage
