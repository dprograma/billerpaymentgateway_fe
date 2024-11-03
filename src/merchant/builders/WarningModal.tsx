import React, { useState } from 'react'
import "./styles/warningModal.css"
import { FaCircleExclamation } from "react-icons/fa6";

// const WarningModal = (message: string) => {
//   return (
//     <div className= 'warning_modal_container'>
//       <div className='warning_modal_wrpr'>
//         <FaCircleExclamation size={100} color='#B20C02'/>
//       </div>
//       <p className='warning_modal_text'>Warning!</p>
//       <p className='warning_modal_text2'>{message}</p>
//       <button className='warning_modal_ok_btn' type='button' onClick={() => window.location.reload()}>ok</button>
//     </div>
//   )
// }

type Props = {
  msg: any,
  onClose: any
}

const WarningModal = ({ msg, onClose }: Props) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className='warning_modal_container' onClick={handleModalContentClick}>
        <div className='warning_modal_wrpr'>
          <FaCircleExclamation size={100} color='#B20C02' />
        </div>
        <p className='warning_modal_text'>{msg}</p>
        <button className='warning_modal_ok_btn' type='button' onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default WarningModal