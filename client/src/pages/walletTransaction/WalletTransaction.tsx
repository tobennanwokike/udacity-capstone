import React,{useEffect,useState, Fragment} from 'react'
import './wallet.css'
import auth0Client from '../../auth/Auth'
import { WalletTransactionData, WalletTransaction } from '../../types/types'
import {walletTransactions} from '../../api/todos'
import Loader from '../../components/loader/Loader'



const WalletTransactions = () => {
  const [userTransactions, setUserTransactions] = useState<WalletTransaction[] | []>([]);

 
  useEffect( () => {
    (async () => {
       try {
      let token =  auth0Client.getIdToken();
      let walletData =  await walletTransactions(token)
      
      setUserTransactions([...walletData])
    
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
                    <h2>Wallet Transactions</h2>
                </div>
                    <table>
                        <thead>
                            <tr>
                              <th>userId</th>
                              {/* <th>transactionId</th> */}
                              <th>walletBalance</th>
                              <th>category</th>
                              <th>amount</th>
                              <th>details</th>
                              <th>transactionId</th>
                            
                            </tr>
                        </thead>
                         <tbody>
                            
                              {!userTransactions ? <Loader /> : userTransactions.map((data,index) => {
                                return (
                                  <Fragment key={index}>
                                  <tr>
                                    <td>{data.userId}</td>
                                    <td>{data.walletBalance}</td>
                                    <td>{data.category}</td>
                                    <td>{data.amount}</td>
                                     <td>{data.details}</td>
                                     <td>{data.transactionId}</td>
                                  </tr>
                                  </Fragment>
                                )
                              })}
                          </tbody>    
                 </table>
          </div>
        </div>
     
    </div>

    
  )
}

export default WalletTransactions