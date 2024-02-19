import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function DashBoard() {
  const [userName, setUserName] = useState("")

  useEffect(() => {

    if (sessionStorage.getItem("username")) {
      setUserName(sessionStorage.getItem("username"))
    } else {
      setUserName("")
    }
  })
  return (
    <>
      <Header insideDashBoard />
      <div style={{ marginTop: "100px" }} className='container'>
        <h1>Welcome <span style={{ color: "orange" }}>{userName.split(" ")[0]}</span></h1>
        <div className="row">
          <div className="col-lg-8">
            <MyProjects />


          </div>

          <div className="col-lg-4">
            <Profile />
          </div>
        </div>
      </div>
    </>


  )
}

export default DashBoard