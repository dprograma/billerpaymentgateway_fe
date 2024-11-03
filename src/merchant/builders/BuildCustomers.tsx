import {useState} from 'react'
import "./styles/buildCustomer.css"
import { useNavigate } from 'react-router-dom'
import { 
    FaPencil,
    FaRegTrashCan 
} from "react-icons/fa6";

type BuildCustomerProps = {
    modal: {
            setShowAddCustomer: any,
            setShowEditCustomer: any,
            setBlur: any
        },
    fullName: string,
    email: string,
    phoneNumber: string,
    dateAdded: string,
}

const BuildCustomer = (props: BuildCustomerProps) => {
  const navigate = useNavigate()

  return (
    <>
        <div className="cust_section" onClick={() => navigate("/merchant/customers/customers2")}>
            <p className="cust_text_ln">{props.fullName}</p>
            <p className="cust_text_ln">{props.email}</p>
            <p className="cust_text_ln">{props.phoneNumber}</p>
            <p className="cust_text_ln">{props.dateAdded}</p>
            <div className="cust_action_div">
                <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                <button className="edit_button" type="button" onClick={() => {props.modal.setShowEditCustomer(true); props.modal.setBlur(true)}}><FaPencil size={20}/></button>
            </div>      
        </div>
        <hr className="cust_hr" />
    </>
  )
}

export default BuildCustomer





