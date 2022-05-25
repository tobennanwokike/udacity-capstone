
import { useState, useEffect, MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import  './modal.css'


export interface PortalProps {
  showModal: {value: boolean}
  setShowModal: (arg0: {value:boolean}) => void
  children: React.ReactNode
}

const Modal: React.FC<PortalProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    
  }, [])

  const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.setShowModal({value:false})
  }

  const element = props.showModal.value ? (
    <div className='modalOverlay'>
      <div className='modal'>
        <div className='modalHeader'>
          <button onClick={handleCloseModal}>
            {/* <Close /> */}
            X
          </button>
         
        </div>
        <div className='modalBody'>{props.children}</div>
      </div>
    </div>
  ) : null

  if (props.showModal.value) {
    return ReactDOM.createPortal(
      element,
      document.getElementById('root') as Element
    )
  } else {
    return null
  }
}

export default Modal
