import React, { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateUserProfileAPI } from '../services/allAPI';
import noProfile from '../assets/noprofile.png'


function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "", password: "", email: "", github: "", linkedin: "", profileImage: ""
  })

  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")



  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      setUserData({
        ...userData,
        username: userDetails.username,
        password: userDetails.password,
        email: userDetails.email,
        github: userDetails.github,
        linkedin: userDetails.linkedin
      });
      setExistingImage(userDetails.profile);
    }
  }, [open]);






  useEffect(() => {
    if (userData.profileImage) {
      setPreview(URL.createObjectURL(userData.profileImage))
    } else {
      setPreview("")
    }
  }, [userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async () => {
    const { username, password, email, github, linkedin, profileImage } = userData
    if (!github || !linkedin) {
      toast.info("Please fill the form completely!!!!")
    } else {
      //proceed to api call
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("password", password)
      reqBody.append("email", email)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", profileImage) : reqBody.append("profileImage", existingImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }

        //api call
        try {
          const result = await updateUserProfileAPI(reqBody, reqHeader)
          if (result.status == 200) {
            setOpen(!open)
            sessionStorage.setItem("userDetails", JSON.stringify(result.data))
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }

      }


    }
  }




  return (
    <div className='border rounded p-2 mt-4'>
      <div className="d-flex justify-content-between">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-danger'><i className='fa-solid fa-caret-down text-info'></i></button>
      </div>
      <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">
          <label>
            <input type="file" style={{ display: "none" }} onChange={e => setUserData({ ...userData, profileImage: e.target.files[0] })} />
            {existingImage == "" ?
              <img width={'200px'} height={'200px'} className='img-fluid rounded-circle' src={preview ? preview : noProfile} alt="upload profile pic" /> :
              <img width={'200px'} height={'200px'} className='img-fluid rounded-circle' src={preview ? preview : `${SERVER_URL}/uploads/${existingImage}`} alt="upload profile pic" />

            }
          </label>

          <div className="mb-2">
            <input type="text" className='rounded p-1 w-75' placeholder='Enter your GitHub Link Here' value={userData.github}
              onChange={e => setUserData({ ...userData, github: e.target.value })} />
          </div>
          <div className="mb-2">
            <input type="text" className='rounded p-1 w-75' placeholder='Enter your Linkedin Link Here' value={userData.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })} />
          </div>
          <div className="mb-3 d-grid w-75 mx-auto">
            <button onClick={handleProfileUpdate} className='btn btn-info'>Update</button>

          </div>

        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored' />
    </div>
  )
}

export default Profile