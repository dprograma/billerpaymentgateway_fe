import "./styles/customers.css"
import { 
    FaPencil,
    FaRegTrashCan 
} from "react-icons/fa6";
import { useState } from "react";
import BuildAddCustomer from "../builders/BuildAddCustomer";
import BuildEditCustomer from "../builders/BuildEditCustomer";
import BuildCustomer2Transaction from "../builders/BuildCustomer2Transaction";
import BuildCustomer2Subscription from "../builders/BuildCustomer2Subscription";
import Window from "../Window";

type Customer2Props = {
}

const Customers2View = (props: Customer2Props) => {    
    const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false)
    const [showEditCustomer, setShowEditCustomer] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const [showTransactions, setShowTransactions] = useState<boolean>(true)
    const [showSubscription, setShowSubscription] = useState<boolean>(false)

    const transactions = [
        {
            refNo: "9859948958",
            item: "Yemi Adamu",
            amount: "N20,000",
            paymentMethod: "Card",
            date: "12 Jan, 2023 02:35",
            status: true
        },
        {
            refNo: "9859948958",
            item: "Yemi Adamu",
            amount: "N20,000",
            paymentMethod: "Card",
            date: "12 Jan, 2023 02:35",
            status: true
        },
        {
            refNo: "9859948958",
            item: "Yemi Adamu",
            amount: "N20,000",
            paymentMethod: "Card",
            date: "12 Jan, 2023 02:35",
            status: false
        },
        {
            refNo: "9859948958",
            item: "Yemi Adamu",
            amount: "N20,000",
            paymentMethod: "Card",
            date: "12 Jan, 2023 02:35",
            status: true
        },
        {
            refNo: "9859948958",
            item: "Yemi Adamu",
            amount: "N20,000",
            paymentMethod: "Card",
            date: "12 Jan, 2023 02:35",
            status: true
        },
    ]

    const subscriptions = [
        {
            planName: "Mentorship",
            price: "N20,000",
            startDate: "12 Jan, 2023",
            endDate: "12 Feb, 2023",
            autoRenewal: true,
        },
        {
            planName: "Mentorship",
            price: "N20,000",
            startDate: "12 Jan, 2023",
            endDate: "12 Feb, 2023",
            autoRenewal: true,
        },
        {
            planName: "Mentorship",
            price: "N20,000",
            startDate: "12 Jan, 2023",
            endDate: "12 Feb, 2023",
            autoRenewal: false,
        },
        {
            planName: "Mentorship",
            price: "N20,000",
            startDate: "12 Jan, 2023",
            endDate: "12 Feb, 2023",
            autoRenewal: true,
        },
    ]


  return (
    <div className={'view_screen'}>
        <div className={ blur? 'cust_super_container_blur':"cust_super_container"}>
            <div className="cust_header_info">
                <p className="cust_header_title">Segun John</p>
                <div className="cust_header">
                    <p className="cust_text">Full Name</p>
                    <p className="cust_text">Email</p>
                    <p className="cust_text">Phone Number</p>
                    <p className="cust_text">Date Added</p>
                    <p className="cust_text">Actions</p>
                </div>
                <hr className="cust_hr" />
                <div className="cust_section" >
                    <p className="cust_text_ln">Segun John</p>
                    <p className="cust_text_ln">segunjohn@mail.com</p>
                    <p className="cust_text_ln">+234 805584984</p>
                    <p className="cust_text_ln">Jan 01, 2023</p>
                    <div className="cust_action_div">
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        <button className="edit_button" type="button" onClick={() => {setShowEditCustomer(true); setBlur(true)}}><FaPencil size={20}/></button>
                    </div>      
                </div>
                <hr className="cust_hr" />
            </div>
            <div className="cust_tab_container">
                <button className="res_dis_btn" type="button" style={{borderBottom: showTransactions? "3px solid #B20C02" : "none", color: showTransactions? "#B20C02" : "#000000"}} onClick={() => {setShowTransactions(true); setShowSubscription(false)} }>Transactions</button>
                <button className="res_dis_btn" type="button" style={{borderBottom: showSubscription? "3px solid #B20C02" : "none", color: showSubscription? "#B20C02" : "#000000"}} onClick={() => {setShowTransactions(false); setShowSubscription(true)} }>Subscriptions</button>
            </div>
            { showTransactions &&
                <div className="cust_container">
                    <div className=" cust_header">
                        <p className="cust_text">Ref. No</p>
                        <p className="cust_text">Item</p>
                        <p className="cust_text">Amount</p>
                        <p className="cust_text">Mode of Payment</p>
                        <p className="cust_text">Date</p>
                        <p className="cust_text">Status</p>
                    </div>
                    <hr className="cust_hr" />
                    {
                        transactions.map((transaction) => BuildCustomer2Transaction(transaction))
                    }       
                </div>
            }
            { showSubscription &&
                <div className="cust_container">
                    <div className=" cust_header">
                        <p className="cust_text">Plan Name</p>
                        <p className="cust_text">Price</p>
                        <p className="cust_text">Start Date</p>
                        <p className="cust_text">End Date</p>
                        <p className="cust_text">Auto Renewal</p>
                    </div>
                    <hr className="cust_hr" />
                    {
                        subscriptions.map((subscription) => BuildCustomer2Subscription(subscription))
                    }            
                </div>
            }
        </div>
        <div className="cust_add_customer_container">
                    {showAddCustomer && BuildAddCustomer(setShowAddCustomer, setBlur)}
                    {showEditCustomer && BuildEditCustomer(setShowEditCustomer, setBlur)}
        </div>
    </div>
  )
}


const Customers2 = () => {
    const content = {
        currentView: <Customers2View />,
        activeId: 3
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Customers2
