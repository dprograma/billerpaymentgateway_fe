import {useState} from 'react'
import "./styles/buildCustomer2Transaction.css"
import { useNavigate } from 'react-router-dom'
import { 
    FaPencil,
    FaRegTrashCan 
} from "react-icons/fa6";

type BuildCustomer2SubscriptionProps = {
    planName: string,
    price: string,
    startDate: string,
    endDate: string,
    autoRenewal: boolean,
}
const BuildCustomer2Subscription = (props: BuildCustomer2SubscriptionProps) => {
  const navigate = useNavigate()

  return (
    <>
       <div className="cust_section" >
            <p className="cust_text_ln">{props.planName}</p>
            <p className="cust_text_ln">{props.price}</p>
            <p className="cust_text_ln">{props.startDate}</p>
            <p className="cust_text_ln">{props.endDate}</p>
            <div className="cust_text_ln">
                <p className={props.autoRenewal? "cust_sub_status_on" : "cust_sub_status_off"}>{props.autoRenewal? "on" : "off"}</p>  
            </div>  
        </div>
        <hr className="cust_hr" /> 
</>
  )
}

export default BuildCustomer2Subscription




