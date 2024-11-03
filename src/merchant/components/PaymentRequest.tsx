import 
{useState}
 from 'react'
import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/paymentRequest.css"
import Window from '../Window';
import CreatePaymentRequestModal from '../builders/CreatePaymentRequestModal';
import { useNavigate } from 'react-router-dom';

type Props = {}

const PaymentRequestView = (props: Props) => {
    const { t } = useTranslation('merchant_paymentrequest');
    const [showPayReq, setShowPayReq] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const navigate = useNavigate()
  return (
    <div className='paym_req_super_container1'>
        <div className={blur? "paym_req_super_container_blur" : "paym_req_super_container"}>
            <p className="paym_req_header_title">{t('payment_request')}</p>
            <p className='paym_req_desc_text'>{t('simplify_payments')}</p>
            <div className='paym_req_row2_container'>
                <div className='paym_req_search_bar_container'>
                    <div className='paym_req_search_box'>
                        <FaMagnifyingGlass size={30} color='#667085'/>
                        <input placeholder={t('search')} type='search' id='paym_req_search_input'/>
                    </div>
                    <select className="paym_req_search_filter">
                        <option value="">{t('filter')}</option>
                        <option value="date_filter">{t('filter_by_date')}</option>
                        <option value="amount_filter">{t('filter_by_amount')}</option>
                    </select>
                </div>
                <div className='paym_req_btn_wrapper'>
                    <button className='paym_req_btn' type='button' onClick={() => {setShowPayReq(true); setBlur(true)}}>+ {t('create_payment')}</button>
                </div>
            </div>
            <div className="paym_req_container">
                <div className="paym_req_header">
                    <p className="paym_req_text">{t('no')}</p>
                    <p className="paym_req_text">{t('full_name')}</p>
                    <p className="paym_req_text">{t('date_created')}</p>
                    <p className="paym_req_text">{t('due_date')}</p>
                    <p className="paym_req_text">{t('due')}</p>
                    <p className="paym_req_text">{t('amount')}</p>
                    <p className="paym_req_text">{t('paid')}</p>
                    <p className="paym_req_text">{t('balance_due')}</p>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status_complete">Complete</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status_complete">Complete</p>
                    </div>
                </div>
                <div className="paym_req_section" onClick={() => navigate("/merchant/payment-request/payment-request-details")}>
                    <p className="paym_req_text_ln">0105</p>
                    <p className="paym_req_text_ln">Agnes James</p>
                    <p className="paym_req_text_ln">5 Jan. 2023</p>
                    <p className="paym_req_text_ln">None</p>
                    <p className="paym_req_text_ln">-</p>
                    <p className="paym_req_text_ln">N30,000</p>
                    <p className="paym_req_text_ln">N15,000</p>
                    <div className='paym_req_text_ln'>
                        <p className="paym_req_status">N25,000</p>
                    </div>
                </div>
                <hr className="paym_req_hr"/>
            </div>
        </div>
        {showPayReq && CreatePaymentRequestModal(setShowPayReq, setBlur)}
    </div>
  )
}

const PaymentRequest= () => {
    const content = {
        currentView: <PaymentRequestView />,
        activeId: 8
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default PaymentRequest