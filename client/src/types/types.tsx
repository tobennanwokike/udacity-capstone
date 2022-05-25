export interface Todo {
    todoId: string
    createdAt: string
    name: string
    dueDate: string
    done: boolean
    attachmentUrl?: string
  }

  export interface ProfileData {
    
    item: UserDetails
    
  }

  export interface UserDetails {
    imageUrl: string
    createdAt: string
    userId: number
    walletBalance: number
    profileId: number
  }

  export interface CreateTodoRequest {
    name: string
    dueDate: string
  }

  export interface UpdateTodoRequest {
    name: string
    dueDate: string
    done: boolean
  }

  export interface TransactionResponseData {
    item: TransactionData,
    
}

  export interface TransactionData {
      userId: string,
      status: string,
      createdAt: string,
      amount: number,
      remarks: string,
      phone: string,
      transactionId: string,
      accessToken: number,
      network: string,
      paymentReference?:string
  }

  export interface WalletBalance {
    walletBalance: number | string,
}

export interface PaymentReference {
  paymentReference: string,
}

export interface CreateTransaction {
  amount: number,
  network: string,
  phone: string
}

export interface WalletTransactionData {
  items: WalletTransaction,
 
}

export interface WalletTransaction {
  userId: string,
  createdAt: string,
  walletBalance: number,
  amount: number,
  walletTransactionId: string,
  transactionId: string,
  details: string,
  category:string
}
