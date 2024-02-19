import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/login.png'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({ insideRegister }) {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const [loginStatus, setLoginStatus] = useState(false)


  const navigate = useNavigate()
  // console.log(insideRegister);
  const [userInputData, setUserInputData] = useState({
    username: "", email: "", password: ""
  })
  // console.log(userInputData);
  const handleRegister = async (e) => {
    e.preventDefault()
    // console.log(userInputData);
    const { username, email, password } = userInputData
    if (!username || !email || !password) {
      toast.error("Please fill the form completely")
    } else {
      // toast.success("Proceed to register api")
      try {
        const result = await registerAPI(userInputData)
        console.log(result);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username}...Please Login to explore our site..!!`)
          setUserInputData({ username: "", email: "", password: "" })
          //navigate to login
          setTimeout(() => {
            navigate("/login")

          }, 2000)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(userInputData);
    const { email, password } = userInputData
    if (!email || !password) {
      toast.error("Please fill the form completely")
    } else {
      try {
        const result = await loginAPI(userInputData)
        console.log(result);
        if (result.status === 200) {
          //store username,token in session storage
          sessionStorage.setItem("username", result.data.existingUser.username)
          sessionStorage.setItem("token", result.data.token)
          //store total details of user
          sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
          setLoginStatus(true)
          setIsAuthorised(true)

          setTimeout(() => {
            setUserInputData({ email: "", password: "" })
            //navigate to landing page

            navigate("/")
            setLoginStatus(false)
          }, 2000);
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div style={{ width: "100%", height: "100vh", marginBottom: "20px" }} className='d-flex justify-content-center align-items-center '>
      <div className="container w-75">
        <Link to='/' style={{ textDecoration: "none", color: "blue" }}><i className='fa-solid fa-arrow-left'></i> Back to Home</Link>
        <div className="card shadow p-5 x1 mt-3" style={{ backgroundColor: "#f5c400" }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={login} alt="authentication" />
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bolder text-black mt-3 j1 fs-3'>
                <i style={{ height: "41px", color: "#0049c7" }} className='fa-brands fa-codepen  '></i> Project Fair
              </h1>
              <h5 className='fw-bolder text-light mt-2 '>Sign {insideRegister ? "Up" : "In"} To Your Account</h5>
              <Form>
                {
                  insideRegister &&
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control className='mt-2' type="email" placeholder="Enter Name" value={userInputData.username} onChange={e => setUserInputData({ ...userInputData, username: e.target.value })} />
                  </Form.Group>

                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control className='mt-2' type="email" placeholder="Enter email" value={userInputData.email} onChange={e => setUserInputData({ ...userInputData, email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPswd">
                  <Form.Control className='mt-1' type="password" placeholder="Enter password" value={userInputData.password} onChange={e => setUserInputData({ ...userInputData, password: e.target.value })} />
                </Form.Group>

              </Form>
              {
                insideRegister ?
                  <div>
                    <button onClick={handleRegister} className='btn btn-info mb-2'>Register</button>
                    <p>Already have Account? Click here to <Link style={{ color: "blue" }} to="/login">Login</Link></p>
                  </div> :
                  <div>
                    <button onClick={handleLogin} className='btn btn-info mb-2'>Login {loginStatus && <Spinner animation="border" variant="light" />}</button>
                    <p>New User? Click here to <Link style={{ color: "blue" }} to="/register">Register</Link></p>
                  </div>


              }
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} theme='colored' />
    </div>
  )
}

export default Auth