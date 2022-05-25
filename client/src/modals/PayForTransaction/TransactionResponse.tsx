import React, { FormEvent, useState, useEffect } from 'react'
import './transactionResp.css'
import {createTransactions, updateTransactions} from '../../api/todos'
import auth0Client from '../../auth/Auth';
import {AppToaster} from '../../utils/Toaster';
import { TransactionResponseData } from '../../types/types'
import Modal from '../Modal';

interface Item{
   transactionRespData: TransactionResponseData
  //  showResponseModal: {value: boolean},
   toggleShowResponseModal: () => any
   showModal: {value: boolean},
   setShowModal: (arg0: {value: boolean}) => any
}

function TransactionResponseModal({transactionRespData,setShowModal, 
  showModal,toggleShowResponseModal } : Item) {
  const [paymentReference, setPaymentReference] = useState('')
  const [userToken, setUserToken] = useState('')
  const [loading, setLoading] =  useState(false)

   useEffect(() => {
    let token =  localStorage.getItem('token') as string;
    setUserToken(token)
    
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    let length = 12 // Customize the length here.
    for (let i = length; i > 0; --i) 
    result += characters[Math.round(Math.random() * (characters.length - 1))]
    setPaymentReference(result)
   },[])

  
  const handleSubmit =  async () => {
  
      try {
         const formData = {paymentReference}
            setLoading(true)
            await  updateTransactions(userToken,transactionRespData.item.transactionId,formData)
            AppToaster('Transaction Success', 'top-center', 'success')
            setLoading(false)
            setShowModal({value: false})
            toggleShowResponseModal()

      } catch (error) {
        setLoading(false)
        AppToaster(`${error}`, 'top-center', 'error')
        setShowModal({value: false})
        toggleShowResponseModal()
        // alert('error.message')
      }
  }


  return (
    <div className='card_details_form'>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
        <h2> Transaction Details</h2>
        <div>
          <span>TransactionId :</span> {transactionRespData.item.transactionId}
        </div>
        <div>
          <span>Amount :</span> {transactionRespData.item.amount}
        </div>
        <div>
          <span>Network :</span> {transactionRespData.item.network}
        </div>
        <div>
          <span>Phone :</span> {transactionRespData.item.phone}
        </div>
        <div>
          <span>Status :</span> {transactionRespData.item.status}
        </div>
        <div className="btn-wrapper">
          <button onClick={() => handleSubmit()} className="pay_button"> {loading ? 'Loading...' : 'Pay'}</button>
          <button onClick={() => toggleShowResponseModal()}  className="pay_button "> Back</button>
        </div>
      {/* </form> */}
    </div>
  )
}

export default TransactionResponseModal;
