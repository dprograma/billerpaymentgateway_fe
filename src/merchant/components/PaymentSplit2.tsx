import "./styles/paymentSplit2.css"
import { 
    FaRegTrashCan,
    FaPencil, 
} from "react-icons/fa6";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import AddSplitMember from "../builders/AddSplitMember";
import EditSplitMember from "../builders/EditSplitMember";
import Window from "../Window";
import { useNavigate } from "react-router-dom";

type Props = {}

const PaymentSplit2View = (props: Props) => {
    const { t } = useTranslation('merchant_paymentsplit');
    const navigate = useNavigate()
    const [showAddSplitMember, setShowAddSplitMember] = useState<boolean>(false)
    const [showEditSplitMember, setShowEditSplitMember] = useState<boolean>(false)

    const [blur, setBlur] = useState<boolean>(false)
  return (
    <div className={'view_screen'}>
        <div className={ blur? 'paym_split2_super_container_blur':"paym_split2_super_container"}>
            <div className="paym_split2_header_info">
                <div>
                    <p className="paym_split2_header_title">{t('new_business_project')}</p>
                    <p className='paym_split2_desc_text'>{t('descriptive_body')}</p>
                </div>
                <button type="button" className="paym_split2_add_mem_btn" onClick={() => {setShowAddSplitMember(true); setShowEditSplitMember(false); setBlur(true)}}>+ {t('add_member')}</button>
            </div>
            <hr className="paym_split2_hr" />
            <div className="paym_split2_container">
                <div className="paym_split2_header">
                    <p className="paym_split2_text">{t('member')}</p>
                    <p className="paym_split2_text">{t('date_added')}</p>
                    <p className="paym_split2_text">{t('bank_details')}</p>
                    <p className="paym_split2_text">{t('percentage')}</p>
                    <p className="paym_split2_text">{t('amount_earned')}</p>
                    <p className="paym_split2_text">{t('actions')}</p>
                </div>
                <hr className="paym_split2_hr" />
                <div className="paym_split2_section">
                    <p className="paym_split2_text_ln">John Adamu</p>
                    <p className="paym_split2_text_ln">23 May, 2023</p>
                    <p className="paym_split2_text_ln">UBA<br></br>003949498595</p>
                    <p className="paym_split2_text_ln">20%</p> 
                    <p className="paym_split2_text_ln">N300,000</p> 
                    <div className="paym_split2_action_div">
                        <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowEditSplitMember(true); setShowAddSplitMember(false)}}><FaPencil size={20}/></button>
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                    </div>    
                </div>
                <hr className="paym_split2_hr" />
                <div className="paym_split2_section">
                    <p className="paym_split2_text_ln">John Adamu</p>
                    <p className="paym_split2_text_ln">23 May, 2023</p>
                    <p className="paym_split2_text_ln">UBA<br></br>003949498595</p>
                    <p className="paym_split2_text_ln">20%</p> 
                    <p className="paym_split2_text_ln">N300,000</p> 
                    <div className="paym_split2_action_div">
                        <button className="edit_button" type="button" onClick={() => { setBlur(true)}}><FaPencil size={20}/></button>
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                    </div>    
                </div>
                <hr className="paym_split2_hr" />
                <div className="paym_split2_section">
                    <p className="paym_split2_text_ln">John Adamu</p>
                    <p className="paym_split2_text_ln">23 May, 2023</p>
                    <p className="paym_split2_text_ln">UBA<br></br>003949498595</p>
                    <p className="paym_split2_text_ln">20%</p> 
                    <p className="paym_split2_text_ln">N300,000</p> 
                    <div className="paym_split2_action_div">
                        <button className="edit_button" type="button" onClick={() => { setBlur(true)}}><FaPencil size={20}/></button>
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                    </div>    
                </div>
                <hr className="paym_split2_hr" />
            </div>
        </div>
        <div className="paym_split2_add_member_cont">
            {showAddSplitMember && AddSplitMember(setShowAddSplitMember, setBlur)}
            {showEditSplitMember && EditSplitMember(setShowEditSplitMember, setBlur)}
        </div>
    </div>
  )
}


const PaymentSplit2 = () => {
    const content = {
        currentView: <PaymentSplit2View />,
        activeId: 15
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default PaymentSplit2