import { apiEndpoint } from '../config'
import { Todo ,ProfileData, TransactionData, PaymentReference, WalletTransaction} from '../types/types';
import { CreateTodoRequest } from '../types/types';
import Axios from 'axios'
import { UpdateTodoRequest, WalletBalance , CreateTransaction, TransactionResponseData } from '../types/types';


export async function getProfile(idToken: string): Promise<ProfileData> {
  
  const response = await Axios.get(`${apiEndpoint}/profile`, {
    headers: {
      'Content-Type': 'application/json',
      //  'Authorization': `Bearer ${idToken}`
      'Authorization': `Bearer ${ localStorage.getItem('token')}`
    },
  })
 
  return await response.data.item
}

export async function createProfile(idToken: string, data:string): Promise<ProfileData> {
  
  const response = await Axios.post(`${apiEndpoint}/profile`, JSON.stringify(data), {
    headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${ localStorage.getItem('token')}`
    },
  })
  
  return await response.data
}

export async function updateProfile(idToken: string, profileId: number, data: WalletBalance): Promise<void> {
  const response = await Axios.patch(`${apiEndpoint}/profile/${profileId}`, JSON.stringify(data), {
    headers: {
       'Content-Type': 'application/json',
       'Authorization':  `Bearer ${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${idToken}`
    },
  })
  
  return await response.data
}

export async function getTransactions(idToken: string): Promise<TransactionData[]> {
  
  const response = await Axios.get(`${apiEndpoint}/transactions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${idToken}`
    },
  })
 
  return await response.data.items
}

export async function createTransactions(idToken: string, data: CreateTransaction): Promise<TransactionResponseData> {
  
  const response = await Axios.post(`${apiEndpoint}/transactions`,  JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${idToken}`
    },
  })

  return await response.data
}

export async function updateTransactions(idToken: string, profileId:string, data: PaymentReference): Promise<void> {
  
  const response = await Axios.patch(`${apiEndpoint}/transactions/${profileId}`,  JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${idToken}`
    },
  })

  return await response.data
}

export async function walletTransactions(idToken: string): Promise<WalletTransaction[]> {
  
  const response = await Axios.get(`${apiEndpoint}/wallet/transactions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${idToken}`
    },
  })

  return await response.data.items
}

export async function getTodos(idToken: string): Promise<Todo[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> {
  const response = await Axios.post(`${apiEndpoint}/todos`,  JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  todoId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(idToken: string,profileId: number
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/profile/${profileId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<any> {
 let response = await Axios.put(uploadUrl, file);

 return response.status
}
