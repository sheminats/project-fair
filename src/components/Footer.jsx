import React from 'react'
import { Row , Col, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className='q1 w-100 'style={{marginTop:"20px"}}>
    <Container className='p-3   text-white'>
      <Row className='w-100 container'>
       <Col lg={3} md={3} >
       <Navbar>
       <Container>
         <Navbar.Brand >
         <Navbar.Brand> <Link to={'/'} className='text-black fw-bolder fs-5   ' style={{textDecoration:'none'}} ><i class="fa-brands fa-codepen fa-bounce" style={{color: "#0049c7"}}></i> Project Fair</Link></Navbar.Brand>

         </Navbar.Brand>
       </Container>
     </Navbar>
       </Col>



       <Col  lg={3} md={3} style={{fontFamily:'Playfair Display'}}>
       <h4 className='text-black' >Link</h4>
       <a href="home" className='text-white' style={{textDecoration:'none'}} >Home</a><br />
       <a href="projects" className='text-white' style={{textDecoration:'none'}}>Projects</a><br />
       <a href="dashboard" className='text-white' style={{textDecoration:'none'}}>DashBoard</a><br />
       </Col>


       <Col lg={3} md={3}>
       <h4 className='text-black'>Guides</h4>
       <h6>react</h6>
       <h6>react bootstrap</h6>
       <h6>routing</h6>
       </Col>


       <Col lg={3} md={3}>
       <h4 className='text-black'>Contact Us</h4>
       <input className='w-100 p-1' type="text" name="" id="" placeholder='enter email' /><br /><br />
       <button className='bg-info text-white w-100 p-1 mb-1'>Send</button>
       <div >
         <i style={{ marginLeft: '3rem' }} class="fa-brands fa-instagram"></i>
         <i  style={{ marginLeft: '3rem' }} class="fa-brands fa-facebook"></i>
         <i style={{ marginLeft: '3rem' }}class="fa-brands fa-twitter"></i>
         <i style={{ marginLeft: '3rem' }}class="fa-brands fa-github"></i>
       </div>

       
       </Col>


      </Row>
    </Container>


   </div>

  )
}

export default Footer