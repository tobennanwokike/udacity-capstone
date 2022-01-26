/**
 * Fields in a request to create a single Transaction item.
 */
 export interface CreateWalletTransactionRequest {
    amount: number
    walletBalance: number
    category: string
    details: string
    transactionId: string
  }