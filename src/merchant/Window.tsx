import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./styles/window.css";
import ibillslogo from "./assets/amaps.png"
import ojapay from "../shared/assets/images/ojapay.png"
import {
    FaUser,
    FaHeadset,
    FaRegIdBadge,
    FaArrowDownUpAcrossLine,
    FaBell,
    FaChevronDown,
    FaBorderAll,
    FaChartColumn,
    FaGift,
    FaFile,
    FaAddressBook,
    FaBuffer,
    FaFileCircleXmark,
    FaStore,
    FaShare,
    FaGear
} from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, setPacketStatus, setMessage, resetAuthState } from '../shared/assets/slices/authSlice';
import HandleSubmit from "./components/HandleSubmit";
import { env } from "../shared/assets/environment/envSelector";
import { access } from "fs";
import LanguageSwitcherMerchant from '../LanguageSwitcherMerchant'
import Spinner from '../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


type Props = {
    currentView: any
    activeId: number
}

const Window = (props: Props) => {
    const { t } = useTranslation('merchant_window');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [profileDropDownOptions, setProfileDropDownOptions] = useState<boolean>(false)
    const [statusMessage, setStatusMessage] = useState<boolean>(false);
    const { packetStatus, message, firstName, lastName, phoneNo, password, email, emailOtp, phoneOtp, getUser } = useSelector((state: { auth: authState }) => state.auth);
    const { logout } = env;
    const { access_token = '', user = '', wallet } = getUser || {}
    const { first_name = '', last_name = '' } = user || {}
    const { balance = '', currency = '' } = wallet[0] || {}

    const handleLogout = async (e: any) => {
        const headers = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        setIsLoading(true);
        try {
            const success = await HandleSubmit(e, {}, logout, "DELETE", setPacketStatus, setStatusMessage, undefined, undefined, headers);
            if (success) {
                dispatch(resetAuthState())
            }

        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: "Something went wrong. Please try again later."
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="window-main">
            <Spinner isLoading={isLoading} />
            <div className='menu_bar'>
                <div>
                    <img src={ojapay} alt="ibills logo" className="img-fluid rounded-pill" style={{ width: '220px', height: '90px', borderRadius: '50px' }} onClick={() => navigate('/merchant')} />
                </div>
                <hr className='w_hr' />
                <ul>
                    <li
                        className={props.activeId === 1 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/dashboard")
                        }}
                    >
                        <FaBorderAll size={15} />
                        {t('dashboard')}
                    </li>
                    <li
                        className={props.activeId === 2 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/transactions")
                        }}
                    >
                        <FaChartColumn size={15} />
                        {t('transactions')}
                    </li>
                    <li
                        className={props.activeId === 3 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/customers")
                        }}
                    >
                        <FaRegIdBadge size={15} />
                        {t('customers')}
                    </li>
                    <li
                        className={props.activeId === 4 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/subscriptions")
                        }}
                    >
                        <FaBuffer />
                        {t('subscription_plans')}
                    </li>
                    <li
                        className={props.activeId === 5 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/subscribers")
                        }}
                    >
                        <FaAddressBook size={15} />
                        {t('subscribers')}
                    </li>
                    <li
                        className={props.activeId === 6 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/disputes")
                        }}
                    >
                        <FaFileCircleXmark size={15} />
                        {t('disputes')}
                    </li>
                    <li
                        className={props.activeId === 7 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/payouts")
                        }}
                    >
                        <FaShare size={15} />
                        {t('withdrawals')}
                    </li>
                    <li
                        className={props.activeId === 8 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/payment-request")
                        }}
                    >
                        <FaFile size={15} />
                        {t('payment_requests')}
                    </li>
                    <li
                        className={props.activeId === 15 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/payment-split")
                        }}
                    >
                        <FaArrowDownUpAcrossLine size={15} />
                        {t('payment_split')}
                    </li>
                    <hr className='w_hr' />
                </ul>
                <ul>{t('shop')}
                    <li
                        className={props.activeId === 9 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/my-shop")
                        }}
                    >
                        <FaStore size={15} />
                        {t('my_shop')}
                    </li>
                    <li
                        className={props.activeId === 10 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/create-product")
                        }}
                    >{t('create_product')}</li>
                </ul>
                <ul>{t('my_rewards')}
                    <li
                        className={props.activeId === 11 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/my-rewards")
                        }}
                    >
                        <FaGift size={15} />
                        {t('my_rewards_sm')}
                    </li>
                </ul>
                <ul>{t('settings')}
                    <li
                        className={props.activeId === 12 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("merchant/business-verification2")
                        }}
                    >
                        <FaGear size={15} />
                        {t('integration_settings')}
                    </li>
                    <li
                        className={props.activeId === 18 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/api-and-web-hook")
                        }}
                    >
                        {t('api_and_webhook')}
                    </li>
                    <li
                        className={props.activeId === 18 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/set-wallet-pin")
                        }}
                    >
                        {t('set_walletpin')}
                    </li>
                </ul>
                <ul>{t('security')}
                    <li
                        className={props.activeId === 17 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/security/access-control")
                        }}
                    >
                        <FaGear size={15} />
                        {t('access_control')}
                    </li>
                    <li
                        className={props.activeId === 16 ? "active" : "inactive"}
                        onClick={() => {
                            navigate("/merchant/security/access-control/audit-log-details")
                        }}
                    >
                        {t('audit_log')}
                    </li>
                </ul>
            </div>
            <div className='window'>
                <div className='header'>
                    <section className='header_ln1'>
                        <p className='welcome_msg'>{t('hello')}</p>
                        <p className='users_name'>{first_name} {last_name}</p>
                    </section>
                    <section className='header_ln2'>
                        <div className='header_ln2_field1'>
                            <FaHeadset size={18} />
                            <p>{t('help')}</p>
                        </div>
                        <div className='header_ln2_field2'>
                            <FaBell size={18} />
                            <p>{t('notifications')}</p>
                        </div>
                        <div className='header_ln2_field3'>
                            <FaUser size={18} />
                        </div>
                        <div className='header_ln2_field4'>
                            <FaChevronDown size={0} onClick={() => setProfileDropDownOptions(!profileDropDownOptions)} />
                            <ul className={profileDropDownOptions ? "profile_dropdown_opts_open" : "profile_dropdown_opts_close"}>
                                <li><a href="/Merchant/profile">{t('profile')}</a></li>
                                <li><a href="&">{t('settings_sm')}</a></li>
                                <li><a href="&" onClick={handleLogout}>{t('logout')}</a></li>
                            </ul>
                        </div>
                        <LanguageSwitcherMerchant />
                    </section>
                </div>
                <div className='view_screen_container'>
                    {props.currentView}

                </div>
            </div>

        </main>
    )
}

export default Window