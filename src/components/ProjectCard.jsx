import React,{useState} from 'react'
import { Modal,Card, Row,Col } from 'react-bootstrap';
import SERVER_URL from '../services/serverUrl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
  <Card className="shadow mb-5 btn"style={{ width: '22rem' }} onClick={handleShow}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>
    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="project image" />
            </Col >
            <Col  sm={12} md={6}>
<h2 className='fw-bolder 'style={{color:"orange"}}>{project?.title}</h2>
<p>Project Overview: <span className='fw-bolder'>{project?.overview}
</span></p>
 <p>Language Used : <span className='fw-bolder text-danger'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className='mt-3'>
<a href={project?.github} style={{cursor:"pointer"}}> <i style={{height:"34px"}} 
className='fa-brands fa-github fa-2x text-black'></i></a>
<a href={project?.website} style={{cursor:"pointer"}} className='ms-5'> <i style={{height:"34px"}} 
className='fa-solid fa-link fa-2x text-black'></i></a>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard