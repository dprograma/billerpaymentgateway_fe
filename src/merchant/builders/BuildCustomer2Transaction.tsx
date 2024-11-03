import {useState} from 'react'
import "./styles/buildCustomer2Transaction.css"
import { useNavigate } from 'react-router-dom'
import { 
    FaPencil,
    FaRegTrashCan 
} from "react-icons/fa6";

type BuildCustomer2TransactionProps = {
    refNo: string,
    item: string,
    amount: string,
    paymentMethod: string,
    date: string,
    status: boolean
}

const BuildCustomer2Transaction = (props: BuildCustomer2TransactionProps) => {
  const navigate = useNavigate()

  return (
    <>
        <div className="cust_section" >
            <p className="cust_text_ln">{props.refNo}</p>
            <p className="cust_text_ln">{props.item}</p>
            <p className="cust_text_ln">{props.amount}</p>
            <p className="cust_text_ln">{props.paymentMethod}</p>
            <p className="cust_text_ln">{props.date}</p>
            <div className="cust_text_ln">
                <p className={props.status? "cust_status_successful": "cust_status_failed"}>{props.status? "Successful" : "Failed"}</p>  
            </div>  
        </div>
    </>
  )
}

export default BuildCustomer2Transaction




