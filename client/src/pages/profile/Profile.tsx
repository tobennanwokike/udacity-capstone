import React,{ useEffect, useState} from 'react'
import './profile.css'
import { getProfile,createProfile, getUploadUrl,uploadFile } from '../../api/todos'
import {ProfileData, UserDetails} from '../../types/types'
import auth0Client from '../../auth/Auth'
import Modal from '../../modals/Modal'
import UpdateProfileModal from '../../modals/updateProfile/UpdateProfile'


const logo =  require("../../assets/images/mnos.png")


const Profile = () => {
 const [userDetails, setUserDetails] = useState<ProfileData>({} as ProfileData);
 const [profileDetails, setProfileDetails] = useState<UserDetails>({} as UserDetails);
 const [showModal, setShowModal] = useState({value:false})
 const [walletUpdate, setWalletUpdate] = useState({value:false})
 const [isShowAddBankDetails, setIsShowAddBankDetails] = useState(true)
 const [accessToken, setAccessToken] = useState(true)
 const [status, setStatus] = useState<number>()
 const [file, setFile] = useState([] as any)
 const [showResponseModal, setShowResponseModal] = useState({value:false})
 
  const toggleCloseResponseModal = () => {
    setShowResponseModal({value: !showResponseModal.value})
  }

console.log(status)

   useEffect(() => {
    (async () => {
       try {
          let token = localStorage.getItem('token') as string;
          let getIsLoggedIn = localStorage.getItem('isLoggedIn')
        
          if(getIsLoggedIn !== null && JSON.parse(getIsLoggedIn) && walletUpdate.value){
            let getDetails = await getProfile(token)

            setProfileDetails(profileDetails => ({
              ...profileDetails,
              ...getDetails}))

      } else if (!walletUpdate.value) {
          let authToken =  auth0Client.getIdToken();
          let createProfileDetails = await createProfile(authToken, '')
          localStorage.setItem('isLoggedIn', JSON.stringify(true))
        
          setUserDetails(userDetails => ({
            ...userDetails,
            ...createProfileDetails}))
      }
    } catch (e:any) {
          console.error(e)
          alert(` ${e.message}`)
    }
  })();
  },[walletUpdate.value, status])
  
  

  const onCloseModal = () => {
    setShowModal({value:false})
  }

  let tokens =  localStorage.getItem('token') as string;

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const files = event.target?.files

    const files = event.target.files?.length ? event.target.files[0] : null
    if (!files) return
    setFile(files)
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
     if (!file) {
        alert('File should be selected')
        return
      }
      
      const uploadUrl = await getUploadUrl(tokens,userDetails?.item?.profileId || 
                                            profileDetails.profileId )
      
      let response = await uploadFile(uploadUrl, file)

      if(response) {
        setStatus(response)
      }
      alert('File was uploaded!')
    } catch (e:any) {
      alert('Could not upload a file: ' + e.message)
    } 
  }



  return (
    <div className='container'>
      <div className="box">
        <h3 className='text'>My Profile</h3>
        <div className="container_box">
           
          <div className="profile_card">
            
              <img src={profileDetails.imageUrl || userDetails?.item?.imageUrl} 
                 alt='profile picture'/>
              <p>{profileDetails?.userId || userDetails?.item?.userId}</p>
          <div> 


              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                type="file"
                accept="image/*"
                placeholder="Image to upload"
                onChange={(e) => handleFileChange(e)}/>
                 <button >Upload Picture</button>
              </form>
              </div>


              <div className='profile_footer'>
                   <button onClick={() => setShowModal({value: true})}>Update Wallet</button>
                </div>
          </div>
          <div className="profile_details">
            <div className="profile_tabs">
              <ul className="profile_tabs_links">
                <li>Profile</li>
              </ul>
            </div>
            <div className="company_info_container">
              <h2>Personal Information</h2>
              <div className="details">
                <div className='mr'>
                  <p className='header_text'>Profile Id</p>
                <p className='details_text'>{profileDetails.profileId || userDetails?.item?.profileId}</p>
                
                </div>
                <div className='mr'>
                  <p className='header_text'>UserId</p>
                <p className='details_text'>{profileDetails?.userId || userDetails?.item?.userId}</p>

                </div>
                <div className='mr'>
                  <p className='header_text'>Wallet Balance</p>
                  <p className='details_text'>  {profileDetails?.walletBalance || userDetails?.item?.walletBalance }</p>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <Modal showModal={showModal} setShowModal={onCloseModal}>
          <UpdateProfileModal id={userDetails?.item?.profileId || profileDetails.profileId}
           toggleShowResponseModal={toggleCloseResponseModal} 
           showModal={showModal} setShowModal={onCloseModal}
           setWalletUpdate={setWalletUpdate}
          /> 
      </Modal> 
    </div>

  
  )
}

export default Profile