import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/disputes.css"
import { useState } from "react";
import { BuildDisputes } from "../builders/BuildDisputes";
import Window from "../Window";



const DisputesView= () => {
    const { t } = useTranslation('merchant_disputes');
    const [disputesContainer, setDisputesContainer] = useState<boolean>(false)
    const [showSettlement, setShowSettlement] = useState<boolean>(false)
    const [decline, setDecline] = useState<boolean>(false)
    const [accept, setAccept] = useState<boolean>(true)

    const disputes = [
        {
            id: 1,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N10,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 3,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N90,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
        {
            id: 2,
            name: "Ola Bisi Adamu",
            date: "14 June, 2022",
            duration: "In 4 days",
            status: "Pending",
            amount: "N16,000",
            decline: decline, 
            setDecline: setDecline,
            accept: accept, 
            setAccept: setAccept,
            disputesContainer: disputesContainer,
            setDisputesContainer: setDisputesContainer,
            showSettlement: showSettlement,
            setShowSettlement: setShowSettlement,
        },
    ]

  return (
        <div className="disp_super_container">
            <div className="disp_header_info">
                <p className="disp_header_title">{t('disputes')}</p>
                <p className='disp_desc_text'>{t('swiftly_resolve')}</p>
            </div>
            <div className='disp_search_bar_container'>
                <div className='disp_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder={t('search')} type='search' id='disp_search_input'/>
                </div>
                <select className="disp_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="disp_super_wrapper">
                <div className="disp_container">
                    <div className="disp_header">
                        <p className="disp_text">{t('customer')}</p>
                        <p className="disp_text">{t('created')}</p>
                        <p className="disp_text">{t('due')}</p>
                        <p className="disp_text">{t('status')}</p>
                    </div>
                    {disputes.map((dispute) => BuildDisputes(dispute))}
                </div>
                { disputesContainer}
            </div>
        </div>
  )
}

const Disputes= () => {
    const content = {
        currentView: <DisputesView />,
        activeId: 6
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Disputes