import React,{useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateProjectAPI } from '../services/allAPI';
import { updateResponseContext } from '../Context/ContextShare';


function Edit({project}) {
const {editResponse,setEditResponse}=useContext(updateResponseContext)
  const [projectData,setProjectData]=useState({
   id:project._id, title:project.title,languages:project.languages,github:project.github,website:project.website,overview:project.overview,projectImage:""
  })
const[preview,setPreview]=useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({   id:project._id, title:project.title,languages:project.languages,github:project.github,website:project.website,
      overview:project.overview,projectImage:""})
  setPreview("")
  }
  const handleShow = () => setShow(true);


useEffect(()=>{
if(projectData.projectImage){
  setPreview(URL.createObjectURL(projectData.projectImage))
}else{
  setPreview("")
}
},[projectData.projectImage])

const handleUpdateProject=async()=>{
  const {id,title,languages,github,website,overview,projectImage}=projectData
  if(!title||!languages||!github||!website||!overview){
    toast.info("Please fill the form completely!!!")
  }else{
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage",project.projectImage)
    const token=sessionStorage.getItem("token")
if(token){
const reqHeader={
  "Content-Type":preview?"multipart/form-data":"application/json",
  "Authorization":`Bearer ${token}`
}
console.log("proceed to api call");
try{
const result=await updateProjectAPI(id,reqBody,reqHeader)
if(result.status==200){
handleClose()
//share response to my project component
setEditResponse(result.data)
}else{
  console.log(result);
}
}catch(err){
  console.log(err);
}

  }
}
}
  return (
   <>
       <button onClick={handleShow} style={{textDecoration:"none"}} className="btn btn-link text-danger d-flex align-items-center fw-bolder"><i style={{height:"34px"}} className="fa-solid fa-edit fa-2x "></i></button>
    <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'> Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
<label className='w-100 d-flex align-items-center flex-column'>
  <input type="file"style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
  <img height={'200px'} width={'200px'} className='' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="project upload pic" />
</label>
            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Title'
                value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Language Used'
                   value={projectData.languages}  onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Github link'   value={projectData.github}  onChange={e=>setProjectData({...projectData,github:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Website link'   value={projectData.website}  onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className="border rounded p-2 w-100"placeholder='Project Overview'   value={projectData.overview}  onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
              </div>




            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="danger">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored' />

   </>
  )
}

export default Edit