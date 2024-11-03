import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/paymentSplit.css"
import { 
    FaPencil,
    FaRegTrashCan 
} from "react-icons/fa6";
import { useState } from "react";
import BuildAddCustomer from "../builders/BuildAddCustomer";
import CreatePaymentSplit from "../builders/CreatePaymentSplit";
import Window from "../Window";
import { useNavigate } from "react-router-dom";

type Props = {}

const PaymentSplitView = (props: Props) => {
    const { t } = useTranslation('merchant_paymentsplit');
    const navigate = useNavigate()
    const [showEditPaymentSplit, setShowEditPaymentSplit] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
  return (
    <div className={'view_screen'}>
        <div className={ blur? 'paym_splt_super_container_blur':"paym_splt_super_container"}>
            <div className="paym_splt_header_info">
                <div>
                    <p className="paym_splt_header_title">{t('payment_split')}</p>
                    <p className='paym_splt_desc_text'>{t('descriptive_body')}</p>
                </div>
                <button type="button" className="paym_splt_create_btn" onClick={() => {setShowEditPaymentSplit(true); setBlur(true)}}>+ {t('create_payment_split')}</button>
            </div>
            <hr className="paym_splt_hr" />
            <div className='paym_splt_details_container'>
                <p className='paym_splt_percentage'>{t('my_percentage')}</p>
                <button className="paym_splt_edit_btn" type="button">
                    <p><FaPencil size={10} className="edit_icon"/>{t('edit')}</p>
                </button>
            </div>
            <div className="paym_splt_container">
                <div className="paym_splt_header">
                    <p className="paym_splt_text">{t('split_name')}</p>
                    <p className="paym_splt_text">{t('description')}</p>
                    <p className="paym_splt_text">{t('currency')}</p>
                    <p className="paym_splt_text">{t('sub_account')}</p>
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
                <div className="paym_splt_section" onClick={() => navigate("/merchant/payment-split-details")}>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">New Business Project</p>
                    <p className="paym_splt_text_ln">NGN</p>
                    <p className="paym_splt_text_ln">3</p>    
                </div>
                <hr className="paym_splt_hr" />
            </div>
        </div>
        <div className="paym_splt_add_customer_container">
                {showEditPaymentSplit && CreatePaymentSplit(setShowEditPaymentSplit, setBlur)}
        </div>
    </div>
  )
}


const PaymentSplit = () => {
    const content = {
        currentView: <PaymentSplitView />,
        activeId: 15
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default PaymentSplit