import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"

//register API
export const registerAPI=async(user)=>{
 return await  commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

//login API
export const loginAPI=async(user)=>{
    return await  commonAPI("POST",`${SERVER_URL}/login`,user,"")
   }
   

//add-project api
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await  commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
   }


//get home project api
export const getHomeProjectAPI=async()=>{
    return await  commonAPI("GET",`${SERVER_URL}/homeProject`,"","")
   }

   //get all project api
   export const getAllProjectAPI=async(searchKey,reqHeader)=>{
    return await  commonAPI("GET",`${SERVER_URL}/allproject?search=${searchKey}`,"",reqHeader)
   }


      //get user project api
      export const getUserProjectAPI=async(reqHeader)=>{
        return await  commonAPI("GET",`${SERVER_URL}/userproject`,"",reqHeader)
       }


//user/edit

export const updateUserProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//project/edit
export const updateProjectAPI=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

    //remove-project

    export const deleteProjectAPI=async(projectId,reqHeader)=>{                 //empty object for no body
        return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
    }
      