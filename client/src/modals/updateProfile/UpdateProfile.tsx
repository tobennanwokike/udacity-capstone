import React, { FormEvent, useState, useEffect,SetStateAction } from 'react'
import './updateProfile.css'
import {updateProfile} from '../../api/todos'
import auth0Client from '../../auth/Auth';
import {AppToaster} from '../../utils/Toaster'


type Props = {
    id: number
    toggleShowResponseModal: () => any
    showModal: {value: boolean},
    setShowModal: (arg0: {value: boolean}) => any,
    setWalletUpdate:(arg0 : {value: boolean}) => any
  }

function UpdateProfileModal({id,showModal, setWalletUpdate, setShowModal,toggleShowResponseModal } :Props) {
  const [walletTransaction, setWalletTransaction] = useState<number | string>('')
  const [userToken, setUserToken] = useState('')
  const [loading, setLoading] =  useState(false)
  const [error, setError] = useState('')

   useEffect(() => {
    let token =  auth0Client.getIdToken();
    // console.log(token)
    setUserToken(token)
   },[userToken])
 
   
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
        if (!!walletTransaction ) {
        
            const formData = {walletBalance: walletTransaction}
            setLoading(true)
            let response = await updateProfile(userToken,id, formData)
            setWalletUpdate({value:true})
            AppToaster('Update WalletBalance Successfully', 'top-center', 'success')
            setLoading(false)
            setWalletTransaction(0)
            setShowModal({value: false})
            toggleShowResponseModal()
    } else {
         setLoading(false)
         AppToaster('All fields required!', 'top-center', 'error')
        // setError('All fields required!')
    } 
    } catch (error) {
         AppToaster(`${error}`, 'top-center', 'error')
         setLoading(false)
    }
    
  }
  return (
    <div className='card_details_form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Update Your Wallet</h2>
        <div>
          <p>{error}</p>
        </div>
        <div className="form-field">
          <input
            type="text"
            id="accountName"
            name="accountName"
            placeholder=" Update Wallet"
            value={walletTransaction}
            onChange={(e) => setWalletTransaction(parseInt(e.target.value))}
          />
        </div>
       
        <div className="btn-wrapper">
          <button  className="btn success"> {loading ? 'Loading...' : 'Update'}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileModal
