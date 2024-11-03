import {useState} from "react"
import { useTranslation } from 'react-i18next';
import {
    FaMagnifyingGlass,
    FaArrowLeftLong,
    FaPencil
} from "react-icons/fa6";
import "./styles/subscriptionDetails.css"
import Window from "../Window";
import CreateNewPlanModal from "../builders/CreateNewPlanModal";
import EditSubscriptionPlanModal from "../builders/EditSubscriptionPlan";
import { useNavigate } from "react-router-dom";

type Props = {}

const SubscriptionDetailsView = (props: Props) => {
    const { t } = useTranslation('merchant_subscription_details');
    const [showEditPlan, setShowEditPlan] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const navigate = useNavigate()

  return (
    <div className='view_screen'>
        <div className= {blur?"sub_super_container_blur" : "sub_super_container"}>
            <div className="sub_header_info">
                <div className='sub_header_title_wrpr2'>
                    <FaArrowLeftLong size={15} onClick={() => navigate(-1)} style={{backgroundColor: "#B20C02", color: "#FFFFFF", padding: "10px", borderRadius: "10px"}}/>
                    <p className="sub_header_title2">{t('mentorship')}</p>  
                </div> 
                <hr className="sub_hr" />
                <div className="sub_header_title_wrpr">
                    <p className="sub_header_title">{t('mentorship')}</p>
                    <button type="button" className="sub_edit_btn" onClick={() => {setShowEditPlan(true); setBlur(true)}}><FaPencil size={15} />{t('edit')}</button>
                </div>
                <p className='sub_desc_text'>{t('unlock_a_world')}
                </p>
                <div className="sub_rev_wrpr">
                    <section>
                        <p className="sub_header_title2">{t('price')}</p>
                        <p className='sub_text'>N20,000</p>
                    </section>
                    <section>
                        <p className="sub_header_title2">{t('frequency')}</p>
                        <p className='sub_text'>{t('monthly')}</p>
                    </section>
                    <section>
                        <p className="sub_header_title2">{t('subscribers')}</p>
                        <p className='sub_text'>20</p>
                    </section>
                    <section>
                        <p className="sub_header_title2">{t('income')}</p>
                        <p className='sub_text'>N200,000</p>
                    </section>
                </div>
            </div>
            <hr className="sub_hr" />
            <div className='sub_search_bar_container'>
                <div className='sub_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder={t('search')} type='search' id='sub_search_input'/>
                </div>
                <select className="sub_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="sub_container">
                <div className="sub_header">
                    <p className="sub_text">{t('subscriber')}</p>
                    <p className="sub_text">{t('amount')}</p>
                    <p className="sub_text">{t('start_date')}</p>
                    <p className="sub_text">{t('end_date')}</p>
                    <p className="sub_text">{t('days_left')}</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" >
                    <p className="sub_text_ln">Joseph Ojo</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">12 Jun, 2024</p>
                    <p className="sub_text_ln">12 July, 2024</p>
                    <p className="sub_text_ln">30</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" >
                    <p className="sub_text_ln">Joseph Ojo</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">12 Jun, 2024</p>
                    <p className="sub_text_ln">12 July, 2024</p>
                    <p className="sub_text_ln">20</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" >
                    <p className="sub_text_ln">Joseph Ojo</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">12 Jun, 2024</p>
                    <p className="sub_text_ln">12 July, 2024</p>
                    <p className="sub_text_ln">10</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" >
                    <p className="sub_text_ln">Joseph Ojo</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">12 Jun, 2024</p>
                    <p className="sub_text_ln">12 July, 2024</p>
                    <p className="sub_text_ln">20</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" >
                    <p className="sub_text_ln">Joseph Ojo</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">12 Jun, 2024</p>
                    <p className="sub_text_ln">12 July, 2024</p>
                    <p className="sub_text_ln">20</p>
                </div>
                <hr className="sub_hr" />
            </div>
        </div>
        <div className="sub_add_plan_container">
            {showEditPlan && EditSubscriptionPlanModal(setShowEditPlan, setBlur)}
        </div>
    </div>
  )
}

const SubscriptionDetails= () => {
    const content = {
        currentView: <SubscriptionDetailsView />,
        activeId: 4
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default SubscriptionDetails