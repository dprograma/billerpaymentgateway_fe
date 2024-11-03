import React from 'react'
import successSVG from "../assets/success.svg"
import "./styles/successModal.css"

type Props = {
  msg: any,
  onClose: any
}

const SuccessModal = ({ msg, onClose }: Props) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className='succ_modal_container' onClick={handleModalContentClick}>
        <img src={successSVG} alt='successful' />
        <p className='succ_modal_text'>{msg}</p>
        <button className='success_modal_ok_btn' type='button' onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessModal