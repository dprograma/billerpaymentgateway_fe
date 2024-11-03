import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/customers.css"

import { useState } from "react";
import BuildAddCustomer from "../builders/BuildAddCustomer";
import BuildEditCustomer from "../builders/BuildEditCustomer";
import BuildCustomer from "../builders/BuildCustomers";
import Window from "../Window";
import { useNavigate } from "react-router-dom";

type Props = {}

const CustomersView = (props: Props) => {
    const { t } = useTranslation('merchant_customers');
    const navigate = useNavigate()
    const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false)
    const [showEditCustomer, setShowEditCustomer] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)

    const customers = [
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        },
        {
            modal: {
                setShowAddCustomer: setShowAddCustomer,
                setShowEditCustomer: setShowEditCustomer,
                setBlur: setBlur
            },
            fullName: "Segun John",
            email: "segunjohn@mail.com",
            phoneNumber: "+234 805584984",
            dateAdded: "Jan 01, 2023",
        }
    ]

  return (
    <div className={'view_screen'}>
        <div className={ blur? 'cust_super_container_blur':"cust_super_container"}>
            <div className="cust_header_info">
                <p className="cust_header_title">{t('customers')}</p>
                <p className='cust_desc_text'>{t('effortlessly_create')}</p>
                <button type="button" className="cust_addNewCustomer_btn" onClick={() => {setShowAddCustomer(!showAddCustomer); setBlur(true)}}>+ {t('add_new_customer')}</button>
            </div>
            <div className='cust_search_bar_container'>
                <div className='cust_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder={t('search')} type='search' id='cust_search_input'/>
                </div>
                <select className="cust_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="cust_container">
                <div className="cust_header">
                    <p className="cust_text">{t('full_name')}</p>
                    <p className="cust_text">{t('email')}</p>
                    <p className="cust_text">{t('phone_number')}</p>
                    <p className="cust_text">{t('date_added')}</p>
                    <p className="cust_text">{t('actions')}</p>
                </div>
                <hr className="cust_hr" />
                {
                    customers.map((customer) => BuildCustomer(customer))
                }
            </div>
        </div>
        <div className="cust_add_customer_container">
                {showAddCustomer && BuildAddCustomer(setShowAddCustomer, setBlur)}
                {showEditCustomer && BuildEditCustomer(setShowEditCustomer, setBlur)}
        </div>
    </div>
  )
}


const Customers = () => {
    const content = {
        currentView: <CustomersView />,
        activeId: 3
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Customers