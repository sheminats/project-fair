import React, { useContext, useEffect ,useState} from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'





function MyProjects() {
  const{editResponse,setEditResponse}=useContext(updateResponseContext)

  const{addResponse,setAddResponse}=useContext(addResponseContext)
  
  const[userProjects,setUserProjects]=useState([])


  const getUserProject=async()=>{
    try { 
      const token= sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
  
        const result=await getUserProjectAPI(reqHeader)
       
          if(result.status===200){
            setUserProjects(result.data);
          }
        }
      }  catch(err){
          console.log(err);
        }
        };
        
        
  console.log(userProjects);
    
  
  
  
  useEffect(()=>{
  getUserProject()
},[addResponse,editResponse])


const handleDeleteProject=async(projectId)=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    
      try{
        const result=await deleteProjectAPI(projectId,reqHeader)
        if(result.status==200){
          getUserProject()
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
      }
    
  }
}



 return (
    <div className='border rounded p-2 mt-4 '>
      <div className="d-flex justify-content-between">
        <h2 className='text-info fw-bolder fs-3'>My Projects</h2>
        <Add/>
      </div>
      <div className="mt-4">
        {    userProjects.length>0?userProjects?.map((project,index)=>(
        <div key={index} className="border rounded d-flex justify-content-between align-items-center mb-3 p-2">
        <h5> {project?.title}</h5>
        <div className="icons d-flex align-items-center">
            <Edit project={project}/>
            <a href={project?.github}className='btn btn-link text-black ms-2'><i style={{height:"34px"}} className="fa-brands fa-github fa-2x"></i></a>
            <button onClick={()=>handleDeleteProject(project._id)} className="btn btn-link ms-2 text-primary"><i style={{height:"34px"}} className="fa-solid fa-trash fa-2x"></i></button>
          </div>
        </div>
        )):
        <div className='fw-bolder text-danger fs-4'>
  Nothing to display!!!!
        </div>
}





      </div>
    </div>
  )
}

export default MyProjects