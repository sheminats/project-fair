import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import DashBoard from './pages/DashBoard'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/TokenAuth'

function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  return (
    <>
    <Routes>
<Route path='/'element={<Home/>}></Route>
<Route path='/login'element={<Auth/>}></Route>
<Route path='/register'element={<Auth insideRegister/>}></Route>
<Route path='/projects'element={isAuthorised?<Projects/>:<Home/>}></Route>
<Route path='/dashboard'element={isAuthorised?<DashBoard/>:<Home/>}></Route>
<Route path='/*'element={<Navigate to={'/'}/>}></Route>
</Routes>
<Footer></Footer>
    </>
  )
}

export default App
