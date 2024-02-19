import React,{useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import upload1 from '../assets/upload1.png'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../Context/ContextShare';


function Add() {
  const{addResponse,setAddResponse}=useContext(addResponseContext)
  const [projectData,setProjectData]=useState({
    title:"",languages:"",github:"",website:"",overview:"",projectImage:""
  })
  const [imageFileStatus,setImageFileStatus]=useState(false)
  const [preview,setPreview]=useState("")   //url 
 
  console.log(projectData);
  
  const [show, setShow] = useState(false);
 const handleClose = () => {
  setShow(false)
  setProjectData({title:"",languages:"",github:"",website:"",overview:"",projectImage:""})
  setPreview(upload1)
 }
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if(projectData.projectImage?.type=="image/png"||projectData.projectImage?.type=="image/jpg"||projectData.projectImage?.type=="image/jpeg"){
      // console.log("Generate image url");
      setImageFileStatus(true)
      //generate url
setPreview(URL.createObjectURL(projectData.projectImage));
    }else{
      setPreview("")
      setProjectData({...projectData,projectImage:""})
      setImageFileStatus(false)
      // console.log("Upload only the following file types (jpg,jpeg,png)")
 }
  },[projectData.projectImage])


 const handleProjectUpload=async()=>{
  const {title,languages,github,website,overview,projectImage} =projectData
  if(!title||!languages||!overview||!github||!website||!projectImage){
toast.info("Please fill the form completely")
  }else{
    console.log("Proceed to api call");
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)


const token=sessionStorage.getItem("token")
if(token){
const reqHeader={
  "Content-Type":"multipart/form-data",
  "Authorization":`Bearer ${token}`
}
console.log("proceed to api call");
try{
  const result=await addProjectAPI(reqBody,reqHeader)
  console.log(result);
  if(result.status===200){
    // toast.success(`New Project ${result.data.title} has added successfully!!!`)
    // console.log(result.data);

//share response to context
setAddResponse(result.data)
handleClose()
  }else{
    toast.warning(result.response.data)
  }
}
catch(err){
  console.log(err);
}
}

  }
 }

  return (
    <>

    <button onClick={handleShow} style={{textDecoration:"none"}} className="btn btn-link text-info d-flex align-items-center fw-bolder ms-auto "><i style={{height:"34px"}} className="fa-solid fa-plus fa-2x me-2 "></i>Add Project</button>
    <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-info'>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
<label className='w-100 d-flex align-items-center flex-column'>
  <input type="file"style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
  <img height={'200px'} width={'200px'} className='' src={preview?preview:upload1} alt="project upload pic" />
</label>
{!imageFileStatus&&<div className="text-primary">
  *Upload only the following file types (jpg,jpeg,png) only*
</div>
}            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Title' 
                value={projectData.title}onChange={e=>setProjectData({...projectData,title:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Language Used'
                                value={projectData.languages}onChange={e=>setProjectData({...projectData,languages:e.target.value})} />

                
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Github link'
                                value={projectData.github}onChange={e=>setProjectData({...projectData,github:e.target.value})} />
                              
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Website link' 
                                value={projectData.website}onChange={e=>setProjectData({...projectData,website:e.target.value})} />

              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Overview' 
                                value={projectData.overview}onChange={e=>setProjectData({...projectData,overview:e.target.value})} />

              </div>




            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleProjectUpload} variant="info">save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'/>
    </>
  )
}

export default Add