import { React, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectAPI } from '../services/allAPI'


function Projects() {
  const [searchKey, setSearchKey] = useState("")
  const [allProjects, setAllProjects] = useState([])


  const getAllProject = async () => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await getAllProjectAPI(searchKey, reqHeader)

        if (result.status === 200) {
          setAllProjects(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  console.log(allProjects);

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className='container-fluid'>
        <div className="d-flex justify-content-between">
          <h1 className='ms-5'>All Projects</h1>
          <input onChange={e => setSearchKey(e.target.value)} style={{ width: "300px" }} className='rounded p-2' type="text" placeholder='Search Projects by its Language' />
        </div>
        <Row className='mt-5'>
          {allProjects.length > 0 ? allProjects.map((project, index) => (
            <Col key={index} sm={12} md={4} lg={4}>
              <ProjectCard project={project} />
            </Col>
          )) :
            <div className='fw-bolder text-danger fs-4'>
              Nothing to display!!!!
            </div>

          }
        </Row>

      </div>
    </>
  )
}

export default Projects