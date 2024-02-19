import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate ,} from 'react-router-dom';
import { tokenAuthContext } from '../Context/TokenAuth';



function Header({insideDashBoard}) {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <div>
               <Navbar style={{zIndex:5}} expand="lg" className="q1 w-100 position-fixed top-0">
      <Container>
      <Navbar.Brand> <Link to={'/'} className='text-black fw-bolder fs-5   ' style={{textDecoration:'none'}} href="#home"><i class="fa-brands fa-codepen fa-bounce" style={{color: "#0049c7"}}></i> Project Fair</Link></Navbar.Brand>
      {
        insideDashBoard&&
        <div className="ms-auto">
          <button onClick={handleLogout} style={{textDecoration:"none"}} className='btn btn-link text-info shadow fw-bolder fs-5'><i className='fa-solid fa-gear me-2'></i>Logout</button>
        </div>
      }
         </Container>
    </Navbar>

    </div>
  )
}

export default Header