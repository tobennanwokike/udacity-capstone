/**
 * https://react-hot-toast.com/
 */
 import toast, { Toaster } from 'react-hot-toast'
//  AppToaster('Welcome!', 'top-center', 'success')
 export const HotToaster = Toaster
 
 const toastCondition = {
   SUCCESS: 'success',
   ERROR: 'error',
   LOADING: 'loading',
   CUSTOM: 'custom',
   PROMISE: 'promise'
 }
 
 export const AppToaster = (
   message: string,
   position: any,
   condition?: string,
   jsx?: any,
   myPromise?: any
 ) => {
   switch (condition) {
     case toastCondition.SUCCESS:
       toast.success(message, {
         duration: 3000,
         // icon: '👏',
         style: {
           borderRadius: '10px',
           // background: '#333',
           // color: '#fff',
           border: '1px solid #d8bbf2'
           // padding: '16px',
         },
         iconTheme: {
           primary: '#d8bbf2',
           secondary: '#882cdb'
         },
         position: position
       })
       break
     case toastCondition.ERROR:
       toast.error(message, {
         duration: 5000,
         // icon: '👏',
         style: {
           borderRadius: '10px',
           // background: '#333',
           // color: '#fff',
           border: '1px solid #db2c6c'
           // padding: '16px',
         },
         iconTheme: {
           primary: '#d8bbf2',
           secondary: '#882cdb'
         },
         position: position
       })
       break
     case toastCondition.LOADING:
       toast.loading(message, {
         duration: 5000,
         // icon: '👏',
         style: {
           borderRadius: '10px',
           // background: '#333',
           // color: '#fff',
           border: '1px solid #d8bbf2'
           // padding: '16px',
         },
         iconTheme: {
           primary: '#d8bbf2',
           secondary: '#882cdb'
         },
         position: position
       })
       break
     case toastCondition.CUSTOM:
       toast.custom(jsx)
       break
     case toastCondition.PROMISE:
       toast.promise(myPromise, {
         loading: 'Loading',
         success: message,
         error: message
       })
       break
     default:
       toast(message, {
         duration: 5000,
         // icon: '👏',
         style: {
           borderRadius: '10px',
           // background: '#333',
           // color: '#fff',
           border: '1px solid #d8bbf2'
           // padding: '16px',
         },
         iconTheme: {
           primary: '#d8bbf2',
           secondary: '#882cdb'
         },
         position: position
       })
       break
   }
 }
 