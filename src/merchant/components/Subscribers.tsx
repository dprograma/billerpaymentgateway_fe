import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./styles/subscribers.css"
import { useState } from "react";
import Window from "../Window";

type Props = {}

const SubscribersView = (props: Props) => {
    const { t } = useTranslation('merchant_subscribers');
    const [showSubInfoContainer, setShowSubInfoContainer] = useState<boolean>(false)
  return (
    <div className='subscribers_view_screen'>
        <div className="subscribers_super_container">
            <div className="subscribers_header_info">
                <p className="subscribers_header_title">{t('subscribers')}</p>
                <p className='subscribers_desc_text'>{t('effortlessly_oversee')}</p>
            </div>
            <div className='subscribers_search_bar_container'>
                <div className='subscribers_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder={t('search')} type='search' id='subscribers_search_input'/>
                </div>
                <select className="subscribers_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="subscribers_super_wrapper">
                <div className="subscribers_container">
                    <hr className="subscribers_hr" />
                    <div className="subscribers_header">
                        <p className="subscribers_text">{t('full_name')}</p>
                        <p className="subscribers_text">{t('email')}</p>
                        <p className="subscribers_text">{t('subscriptions')}</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section" onClick={() => setShowSubInfoContainer(!showSubInfoContainer)}>
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                    <div className="subscribers_section">
                        <p className="subscribers_text_ln">Ola Bisi Adamu</p>
                        <p className="subscribers_text_ln">olabisiadamu@mail.com</p>
                        <p className="subscribers_text_ln">2</p>
                    </div>
                    <hr className="subscribers_hr" />
                </div>
                { showSubInfoContainer &&
                <div className="subs_info_container">
                    <p className="subs_info_title">{t('subscriptions')}</p>
                    <hr className="subscribers_hr" />
                    <div className="subs_header">
                        <p className="subs_text">{t('plan')}</p>
                        <p className="subs_text">{t('price')}</p>
                        <p className="subs_text">{t('recurring')}</p>
                    </div>
                    <div className="subscribers_section">
                        <p className="subs_text_ln">Mentorship</p>
                        <p className="subs_text_ln">N20,000</p>
                        <p className="subs_text_ln">Yes</p>
                    </div>
                    <div className="subscribers_section">
                        <p className="subs_text_ln">Coaching</p>
                        <p className="subs_text_ln">N20,000</p>
                        <p className="subs_text_ln">No</p>
                    </div>
                </div>}
            </div>
        </div>
    </div>
  )
}

const Subscribers= () => {
    const content = {
        currentView: <SubscribersView />,
        activeId: 5
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default Subscribers