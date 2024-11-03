import 
{useState}
 from 'react'
import {
    FaArrowLeftLong 
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/paymentRequestDetails.css"
import Window from '../Window';
import CreatePaymentRequestModal from '../builders/CreatePaymentRequestModal';
import { useNavigate } from 'react-router-dom';

type Props = {}

const PaymentRequestDetailsView = (props: Props) => {
    const { t } = useTranslation('merchant_paymentrequest');
    const [showPayReq, setShowPayReq] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const navigate = useNavigate()
  return (
    <div className='paym_req_super_container1'>
        <div className={blur? "paym_req_det_super_container_blur" : "paym_req_det_super_container"}>
            <div className='paym_req_det_title_wrapper'>
                <FaArrowLeftLong size={15} onClick={() => navigate(-1)} style={{backgroundColor: "#B20C02", color: "#FFFFFF", padding: "10px", borderRadius: "10px"}}/>
                <p className="paym_req_det_title">{t('invoice')}</p>  
            </div> 
            <div  className='paym_req_det_section_wrapper'>
                <div className='paym_req_det_section'>
                    <p className="paym_req_det_title">{t('request_details')}</p>
                    <p className='paym_req_det_text'>{t('rq')}</p>
                    <p className='paym_req_det_text'>{t('issued_date')}</p>
                    <p className='paym_req_det_text'>{t('date_due')}</p>
                </div> 
                <div className='paym_req_det_section'>
                    <p className="paym_req_det_title">{t('issued_to')}</p>
                    <p className='paym_req_det_text'>Agnes James</p>
                    <p className='paym_req_det_text'>34 Ramos Lane, Mainland</p>
                    <p className='paym_req_det_text'>Nigeria</p>
                </div> 
            </div>     
            <div className='paym_req_det_item_section'>
                <p className="paym_req_det_title">{t('item_details')}</p>
                <p className='paym_req_det_text'>{t('item_details_more')}</p>
            </div> 
            <div  className='paym_req_det_serv_section_wrapper'>
                <div className='paym_req_det_serv_section'>
                    <p className="paym_req_det_title">{t('service')}</p>
                    <p className='paym_req_det_title'>{t('quantity')}</p>
                    <p className='paym_req_det_title'>{t('amount')}</p>
                </div> 
                <div className='paym_req_det_serv_section'>
                    <p className="paym_req_det_text">{t('service_name')}</p>
                    <p className='paym_req_det_text'>1</p>
                    <p className='paym_req_det_text'>N20,000</p>
                </div> 
                <div className='paym_req_det_serv_section'>
                    <p className="paym_req_det_text">{t('service_name')}</p>
                    <p className='paym_req_det_text'>1</p>
                    <p className='paym_req_det_text'>N20,000</p>
                </div> 
            </div>  
            <hr className='paym_req_det_hr'/>
            <div  className='paym_req_det_rec_container'>
                <div className='paym_req_det_rec_section'>
                    <p className="paym_req_det_title">{t('payment_records')}</p>
                    <section className='paym_req_rec_wrapper'>
                        <p className='paym_req_rec_amt'>N10,000</p> 
                        <p className='paym_req_rec_date'>12 Jan 2023</p> 
                        <p className='paym_req_rec_desc'>Transfer</p>
                    </section>
                    <section className='paym_req_rec_wrapper'>
                        <p className='paym_req_rec_amt'>N5,000</p> 
                        <p className='paym_req_rec_date'>20 Jan 2023</p> 
                        <p className='paym_req_rec_desc'>Card</p>
                    </section>
                </div> 
                <div className='paym_req_det_bal_sht'>
                    <section className='paym_req_det_bal_sht_sub'>
                        <p>{t('subtotal')}:</p>
                        <p>N40,000</p>
                    </section>
                    <section className='paym_req_det_bal_sht_sub'>
                        <p>{t('discount')}:</p>
                        <p>N0.00</p>
                    </section>
                    <section className='paym_req_det_bal_sht_sub paym_req_det_bold'>
                        <p>{t('tax')}:</p>
                        <p>N40,000</p>
                    </section>
                    <section className='paym_req_det_bal_sht_sub paym_req_det_bold'>
                        <p>{t('balance_due')}:</p>
                        <p className='paym_req_det_bal_due'>N25,000</p>
                    </section>
                </div>
            </div> 
        </div>
        {showPayReq && CreatePaymentRequestModal(setShowPayReq, setBlur)}
    </div>
  )
}

const PaymentRequestDetails= () => {
    const content = {
        currentView: <PaymentRequestDetailsView />,
        activeId: 8
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default PaymentRequestDetails

