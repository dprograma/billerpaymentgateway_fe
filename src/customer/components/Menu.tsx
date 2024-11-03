import React from "react";
import { useTranslation } from 'react-i18next';
import { RootState } from '../../shared/assets/stores/store';
import { useSelector } from 'react-redux';
import profile from "../assets/images/avatar.png";
import MenuPanel from './MenuPanel';
import "../assets/css/Menu.css"; 

const Menu: React.FC = () => {
    const { t } = useTranslation('customer_menu');
    const userdata = useSelector((state: RootState) => state.authWallet.user);
    const { first_name='', last_name='', avatar='', user_type='', username='' } = userdata?.data?.user || {}
    // const img = avatar ? 'http://localhost:8000/static'+avatar : profile
    return (
        <div className="d-none d-md-block menu-container shadow-sm">
            <div className="profile">
                <img src={profile} className="avatar" />
                <div className="profile-info">
                    <h5 className="profile-name">{last_name}, {first_name}</h5>
                    <span className="customer-id">{t('user_type')}: {user_type}</span>
                    <span className="badge" style={{fontSize: '14px', fontWeight: '100', backgroundColor: '#b20c02'}}>{t('tag')}: {username}</span>

                </div>
            </div>
            <MenuPanel/>
        </div>
    );
};

export default Menu;
