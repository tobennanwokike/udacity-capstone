import React, { FormEvent, useState, useEffect, Dispatch, SetStateAction } from 'react'
import './Transactions.css'
import {createTransactions} from '../../api/todos'
import auth0Client from '../../auth/Auth';
import {AppToaster} from '../../utils/Toaster';
import TransactionResponseModal from '../PayForTransaction/TransactionResponse'
import Modal from '../Modal'
import { TransactionResponseData } from '../../types/types'


type Props = {
    showModal: {value: boolean},
    showResponseModal: {value: boolean},
    setShowModal: (arg0: {value: boolean}) => any
    setTransactionResponseData:Dispatch<SetStateAction<TransactionResponseData>>
    toggleShowResponseModal: () => any
  }

function CreateTransactionModal({showModal, toggleShowResponseModal, setTransactionResponseData, setShowModal}: Props) {
  const [phone, setPhone] = useState('')
  const [transactionRespData, setTransactionRespData] = useState<TransactionResponseData>({} as TransactionResponseData)
  const [amount, setAmount] = useState<number>()
  const [network, setNetwork] = useState('')
  const [userToken, setUserToken] = useState('')
  const [loading, setLoading] =  useState(false)
  const [error, setError] = useState('')
 
   useEffect(() => {
    let token =  auth0Client.getIdToken();
    setUserToken(token)

   })

   const clearData = () => {
        setAmount(0)
        setNetwork('')
        setPhone('')
   }

  const handleSubmit =  async (e: FormEvent) => {
    e.preventDefault()
    if (phone.length < 11 || phone.length > 11) {
    AppToaster('Phone number must be 11 digits!', 'top-center', 'error')
     return
    }
   
    if (!!amount && !!phone && !!network ) {
       const formData = { amount, phone, network}
      setLoading(true)
        
       let response = await createTransactions(userToken, formData)
       setTransactionResponseData((transactionRespData: any) => ({
        ...transactionRespData,
        ...response 
      }))
      setTransactionRespData(transactionRespData => ({
        ...transactionRespData,
        ...response 
      }))
        setLoading(false)
        clearData()
        setShowModal({value: false})
        toggleShowResponseModal()
          
   } else {
      setLoading(false)
       AppToaster('All fields are mandatory!', 'top-center', 'error')
   }
   }

  return (
    <div className='card_details_form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Create Transaction</h2>
        <div>
          <p>{error}</p>
        </div>
        <div className="form-field">
          <input
            type="tel"
            id="accountName"
            name="phone"
            // maxLength={11}
            // required
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type="number"
            id="accountName"
            name="network"
            placeholder=" Amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
      
        <div>
        <select value={network}  onChange={(e) => setNetwork(e.target.value)} className='form-field'>
           <option value=""></option>
            <option value="mtn">Mtn</option>
            <option value="9mobile">9mobile</option>
            <option value="glo">Glo</option>
            <option value="airtel">Airtel</option>
       </select>
        </div>
        <div className="btn-wrapper">
          <button disabled={loading}  className="btn success"> {loading ? 'Loading...' : 'Create Transaction'}</button>
        </div>
      </form>

     
    </div>
  )
}

export default CreateTransactionModal;
