import React from 'react'
import { RevolvingDot,Oval } from  'react-loader-spinner'
import './loader.css'

const Loader = () => {
  return (
    <div className='loader'>
        <Oval color="#00BFFF" height={100} width={100} />
    </div>
  )
}

export default Loader