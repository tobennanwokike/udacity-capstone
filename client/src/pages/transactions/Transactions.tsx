import React,{useEffect,useState, Fragment} from 'react'
import './transactions.css'
import auth0Client from '../../auth/Auth'
import { TransactionData } from '../../types/types'
import { getTransactions,walletTransactions} from '../../api/todos'
import Modal from '../../modals/Modal'
import CreateTransactionModal from '../../modals/createTransaction/Transaction'
import Loader from '../../components/loader/Loader'
import { TransactionResponseData } from '../../types/types'
import TransactionResponseModal from '../../modals/PayForTransaction/TransactionResponse'


const Transactions = () => {
  const [userTransactions, setUserTransactions] = useState<TransactionData[] | []>([]);
  const [showModal, setShowModal] = useState({value:false})
  const [isShowAddBankDetails, setIsShowAddBankDetails] = useState(true)
  const [transactionRepsonseData, setTransactionResponseData] = useState<TransactionResponseData>({} as TransactionResponseData )
  // const state = {value:false}
  const [showResponseModal, setShowResponseModal] = useState({value:false})
 
  const toggleCloseResponseModal = () => {
    setShowResponseModal({value: !showResponseModal.value})
  }

  const onCloseModal = (value: {value: boolean}) => {
    setShowModal(value)
  }

  useEffect( () => {
    (async () => {
       try {
      let token =  auth0Client.getIdToken()
      let localToken =  JSON.stringify(localStorage.getItem('token'));
      //  
      // let userToken;
      let  userToken =  await getTransactions(localToken || token)
      // console.log(localToken)
      setUserTransactions([...userToken])
    } catch (e:any) {
      alert(` ${e.message}`)
    }
  })();
  },[])

  
  return (
    <div className='container'>
        <div className="box">
             <div className="content ">
                <div className="table_container">
                    <h2>Transactions</h2>
                    <div className=''>
                      <button className='btn' 
                      onClick={() => setShowModal({value:true})}>
                        Create Transaction</button>
                    </div>
                </div>
                    <table>
                        <thead>
                            <tr>
                              <th>userId</th>
                              {/* <th>transactionId</th> */}
                              <th>amount</th>
                              <th>phone</th>
                              <th>network</th>
                              <th>Status</th>
                              <th>paymentReference</th>
                              <th>AccessToken</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                              {!userTransactions ? <Loader /> : userTransactions.map((data,index) => {
                                return (
                                  <Fragment key={index}>
                                  <tr>
                                    <td>{data.userId}</td>
                                  <td>{data.amount}</td>
                                  <td>{data.phone}</td>
                                  <td>{data.network}</td>
                                  <td>{data.status}</td>
                                  <td>{data.paymentReference}</td>
                                  <td>{data.accessToken}</td>
                                  </tr>
                                  </Fragment>
                                )
                              })}
                          </tbody>   
                 </table>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={onCloseModal}>
             <CreateTransactionModal
             showResponseModal={showResponseModal}
             toggleShowResponseModal={toggleCloseResponseModal} 
             showModal={showModal} setShowModal={onCloseModal} 
             setTransactionResponseData={setTransactionResponseData} 
             />
        </Modal>

        <Modal showModal={showResponseModal} setShowModal={toggleCloseResponseModal}>
          <TransactionResponseModal 
                // showResponseModal={showResponseModal} 
                toggleShowResponseModal={toggleCloseResponseModal} 
                transactionRespData={transactionRepsonseData}
                showModal={showResponseModal} setShowModal={toggleCloseResponseModal}
                />
      </Modal> 
    </div>

    
  )
}

export default Transactions