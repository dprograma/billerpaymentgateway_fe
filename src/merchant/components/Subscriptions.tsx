import {useState} from "react"
import { useTranslation } from 'react-i18next';
import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import "./styles/subscriptions.css"
import Window from "../Window";
import CreateNewPlanModal from "../builders/CreateNewPlanModal";
import SubscriptionDetailsView from "./SubscriptionDetails";
import { useNavigate } from "react-router-dom";

type Props = {}

const SubscriptionsView = (props: Props) => {
    const { t } = useTranslation('merchant_subscriptions');
    const [showCreateNewPlan, setShowCreateNewPlan] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(false)
    const navigate = useNavigate()

  return (
    <div className='view_screen'>
        <div className= {blur?"sub_super_container_blur" : "sub_super_container"}>
            <div className="sub_header_info">
                <p className="sub_header_title">{t('subscription_plans')}</p>
                <p className='sub_desc_text'>{t('create_flexible')}</p>
                <button type="button" className="sub_createPlan_btn" onClick={() => {setShowCreateNewPlan(true); setBlur(true)}}>+ {t('create_new')}</button>
            </div>
            <div className='sub_search_bar_container'>
                <div className='sub_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder='Search' type='search' id='sub_search_input'/>
                </div>
                <select className="sub_search_filter">
                    <option value="">Filter</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="sub_container">
                <div className="sub_header">
                    <p className="sub_text">{t('name_of_plan')}</p>
                    <p className="sub_text">{t('cost')}</p>
                    <p className="sub_text">{t('frequency')}</p>
                    <p className="sub_text">{t('subscribers')}</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section" onClick={() => navigate("/merchant/subscriptions/subscription-details")}>
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
                <div className="sub_section">
                    <p className="sub_text_ln">Mentorship</p>
                    <p className="sub_text_ln">N20,000</p>
                    <p className="sub_text_ln">Monthly</p>
                    <p className="sub_text_ln">1</p>
                </div>
                <hr className="sub_hr" />
            </div>
        </div>
        <div className="sub_add_plan_container">
            {showCreateNewPlan && CreateNewPlanModal(setShowCreateNewPlan, setBlur)}
        </div>
    </div>
  )
}

const Subscriptions= () => {
    const content = {
        currentView: <SubscriptionsView />,
        activeId: 4
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Subscriptions