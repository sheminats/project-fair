import React, { useEffect, useState } from 'react'
import coder1 from '../assets/coder1.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { getHomeProjectAPI } from '../services/allAPI'

function Home() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [allProjects, setAllProjects] = useState([])
  const navigate = useNavigate()

  const getHomeProject = async () => {
    try {
      const result = await getHomeProjectAPI()
      if (result.status === 200) {
        setAllProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(allProjects);

  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)

    }
  }, [])

  const handleNavigate = () => {
    if (loginStatus === true) {
      navigate('/projects')
    } else {
      toast.error("Please Login to get full access to our projects!!!")
    }
  }


  return (
    <>
      <div style={{ height: "90vh", backgroundColor: "#f5c400" }} className="w-100 d-flex justify-content-center align-items-center
rounded">
        <div className="container">
          <div className="row  align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "50px", color: "blue" }} className='fw-bolder mb-2 j1'>
                <i class="fa-brands fa-codepen fa-bounce" style={{ color: "#0049c7", height: "85px" }}></i> Project Fair
              </h1>
              <p className='text-black p-4  ' style={{ textAlign: "justify" }}>One Stop Destination for all Software Development Projects, where
                User can add and manage their projects, as well as access all projects available in our
                website...What are you waiting for !!!</p>
              {loginStatus ? <Link className='btn btn-info mt-2' to={'/dashboard'}>Manage Your Projects  <i class="fa-solid fa-right-long fa-beat-fade ms-2"></i></Link> :
                <Link className='btn btn-info mt-2' to='/login'>Starts to Explore  <i class="fa-solid fa-right-long fa-beat-fade ms-2"></i></Link>
              }
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-4 ">
              <img className="img-fluid mt-3" src={coder1} alt="coder" />
            </div>
          </div>
        </div>
      </div>
      {/* all project part  */}
      <div className='mt-3 '>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className="d-flex  ">
            {allProjects.length > 0 && allProjects.map((project, index) => (
              <div key={index} className="project me-5">
                <ProjectCard project={project} />
              </div>

            ))}

          </div>

        </marquee>
        <div className="text-center">
          <button onClick={handleNavigate} style={{ color: "blue" }} className='btn btn-link '>View More Projects</button>
        </div>
      </div>
      <ToastContainer autoClose={3000} theme='colored' />
    </>
  )
}

export default Home