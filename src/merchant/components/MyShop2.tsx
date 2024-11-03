import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import "./styles/myShop.css";
import BuildShops from "../builders/BuildShops";
import Window from "../Window";
import CreateShop from "../builders/CreateShop";
import axios from "axios";
import WarningModal from "../builders/WarningModal";
import { useSelector } from "react-redux";
import { authState } from "../../shared/assets/slices/authSlice";
import { env } from "../../shared/assets/environment/envSelector";

type Props = {}

interface Shop {
    name: string;
    welcomeText: string;
    status: boolean;
}

const MyShopView = (props: Props) => {
    const { t } = useTranslation('merchant_myshop');
    const [showCreateShop, setShowCreateShop] = useState<boolean>(false);
    const [blur, setBlur] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [shops, setShops] = useState<Shop[]>([]);
    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    const { access_token = '' } = getUser || {};
    const { deleteUpdateProduct } = env;

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowWarningModal(false);
    };

    const msg = t('email_already_exist');

    // Fetch shops from backend
    useEffect(() => {
        const fetchShops = async () => {
            const headers = {
                headers: {
                  "Authorization": `Bearer ${access_token}`
                }
              };
            try {
                const response = await axios.get(deleteUpdateProduct, headers); 
                console.log("response from myshop: ", response.data)
                setShops(response.data); 
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };
        fetchShops();
    }, [access_token, deleteUpdateProduct]); 

    return (
        <div className="mshop_super_container">
            <div className="mshop_header_info">
                <p className="mshop_header_title">{t('my_shops')}</p>
                <p className='mshop_desc_text'>{t('description_body')}</p>
                <button type="button" className="mshop_addNewmshopomer_btn" onClick={() => setShowCreateShop(true)}>+ {t('create_shop')}</button>
            </div>
            <div className='mshop_search_bar_container'>
                <div className='mshop_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085' />
                    <input placeholder={t('search')} type='search' id='mshop_search_input' />
                </div>
                <select className="mshop_search_filter">
                    <option value="">{t('filter')}</option>
                    <option value="date_filter">{t('filter_by_date')}</option>
                    <option value="amount_filter">{t('filter_by_amount')}</option>
                </select>
            </div>
            <div className="mshop_container">
                <div className="mshop_header">
                    <p className="mshop_text">{t('shop_name')}</p>
                    <p className="mshop_text">{t('description')}</p>
                    <p className="mshop_text">{t('status')}</p>
                </div>
                <hr className="mshop_hr" />
                {/* {shops.map((shop) => BuildShops(shop))} */}
                {Array.isArray(shops) && shops.map((shop) => BuildShops(shop))}
                {/* {<WarningModal msg={msg} onClose={handleCloseModal}/>} */}
            </div>
            {
                showCreateShop &&
                CreateShop(setShowCreateShop, setBlur)
            }
        </div>
    )
}

const MyShop = () => {
    const content = {
        currentView: <MyShopView />,
        activeId: 9
    }
    return (
        <Window currentView={content.currentView} activeId={content.activeId} />
    )
}

export default MyShop;
