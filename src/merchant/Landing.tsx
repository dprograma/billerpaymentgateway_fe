import React from 'react'
import { useTranslation } from 'react-i18next';
import ibills from "./assets/amaps.png"
import "./styles/landing.css"
import iconHolder from "./assets/icon.png"
import safeTransaction from "./assets/safe_transaction.png"
import globeImage from "./assets/global.png"
import happy from "./assets/happy.png"
import review1 from "./assets/review1.png"
import review2 from "./assets/review2.png"
import twitter from "./assets/twittter.png"
import instagram from "./assets/instagram.png"
import coolicon from "./assets/coolicon.png"
import apiIcon from "./assets/api.png"
import globeIcon from "./assets/globe.png"
import noHiddenFeesIcon from "./assets/nohiddenfees.png"
import securedIcon from "./assets/secure.png"
import { useNavigate } from 'react-router-dom'
import UBALogo from "./assets/ojapay logo.png"
import ojapay from "../shared/assets/images/ojapay.png"
// import UBALogo from "./assets/UBALogo.jpg"
import LanguageSwitcherMerchant from '../LanguageSwitcherMerchant';


type Props = {}

const Landing = (props: Props) => {
    const { t } = useTranslation('merchant_landing');
  const navigate = useNavigate()
  return (
    <div className='landing'>
        <header className='header_container'>
            <div className='header_tab'>
                <img src={ojapay} alt="ibills_logo" className='amapgs_logo rounded-pill' onClick={ () => navigate("/")}/>
                <ul className='header_links'>
                    <li>{t('about')}</li>
                    <li>{t('contact')}</li>
                    <li>{t('benefits')}</li>
                </ul>
                <div className='header_button_div'>
                    <button  type='button' className='signin_btn' onClick={ () => navigate("signup")}>{t('signup')}</button>
                    <button type='button' className='login_btn' onClick={ () => navigate("signin")}>{t('login')}</button>
                    <LanguageSwitcherMerchant />
                </div>
                    
            </div>
            <div className='text_banner_container'>
                <div className='banner_title'>
                    <h1>{t('the_pan_african')}</h1>
                    <h1>{t('payment_platform')}</h1>
                </div>
                <p className='banner_message'>{t('seamlessly_transforming')} <br/> {t('borders_for_future')}</p>
                <button type='button' className='get_started_button' onClick={ () => navigate("signup")}>{t('get_started')}</button>
                
            </div>
                
        </header>
        <main className='main'>
            <div className='main_row1'>
                <div className='row1_banner_text_container'>
                    <h2 className='row1_banner_text_title'>{t('received_payment')}</h2>
                    <p className='row1_banner_text_msg'>{t('effortless_payments')} <br/> {t('seamless_transactions')}</p>

                </div>
                <div className='row1_section_container'>
                    <section className='row1_section'>
                        <div className='row1_section_icon_wrapper'>
                            <img src={iconHolder} alt="placeholder" />
                        </div>
                        <p className='row1_section_title'>{t('bills_collection')}</p>
                        <p className='row1_section_text'>{t('efficient_bills')}</p>
                    </section>
                    <section className='row1_section'>
                        <div className='row1_section_icon_wrapper'>
                            <img src={globeIcon} alt="globe icon" />
                        </div>
                        <p className='row1_section_title'>{t('global')}</p>
                        <p className='row1_section_text'>{t('simplify_pan_african')}</p>
                    </section>
                    <section className='row1_section'>
                        <div className='row1_section_icon_wrapper'>
                            <img src={noHiddenFeesIcon} alt="no hidden fees icon"/>
                        </div>
                        <p className='row1_section_title'>{t('no_hidden_fees')}</p>
                        <p className='row1_section_text'>{t('you_will_be_charged')}</p>
                    </section>
                    <section className='row1_section'>
                        <div className='row1_section_icon_wrapper'>
                            <img src={securedIcon} alt="secured icon" />
                        </div>
                        <p className='row1_section_title'>{t('secure_payment')}</p>
                        <p className='row1_section_text'>{t('ensuring_peace')}</p>
                    </section>
                </div>
            </div>
            <div className='main_row2'>
                <img src={safeTransaction} alt="safe transaction"/>
                <section className='row2_section'>
                    <h2 className='row2_section_title'>{t('experience_safe')}</h2>
                    <p className='row2_section_text'>{t('experience_worry_free')}</p>
                    <button type='button' className='row2_get_started_btn' onClick={ () => navigate("signup")}>{t('get_started')}</button>
                </section>
            </div>
            <div className='main_row3'>
                <div className='row3_section'>
                    <h2 className='row3_section_title'>{t('accept_payment')}</h2>
                    <p className='row3_section_msg'>{t('elevate_your_finance')} <br/> {t('secure_cross_border')}</p>
                </div>
                <div className='row3_globe_wrapper'>
                    <img className='globe_img' src={globeImage} alt="global network" />
                </div>
            </div>
            <div className='main_row4'>
                <h2 className='row4_section_title'>{t('manage_recurring')}</h2>
                <div className='row4_section_container'>
                    <section className='row4_section_item'>
                        <img src={iconHolder}  alt="placeholder"/>
                        <h3 className='row4_section_sub_title'>{t('payment_plans')}</h3>
                        <p className='row4_section_msg'>{t('empower_customers')}</p>
                    </section>
                    <section className='row4_section_item'>
                        <img src={apiIcon}  alt="api icon"/>
                        <h3 className='row4_section_sub_title'>{t('api_integrations')}</h3>
                        <p className='row4_section_msg'>{t('seamlessly_integration')}</p>
                    </section>
                </div>
            </div>
            <div className='main_row5'>
                <div className='row5_section_container'>
                    <img src={happy} alt="happy people" className='row5_img'/>
                </div>
                <div className='row5_section_container'>
                    <h2 className='row5_section_title'>{t('get_momonie_app')} <br/> {t('google_play_store')}</h2>
                    <p className='row5_section_msg'>{t('download_our_app')} <br/> {t('convenient_access')}</p>
                    <section className='row5_app_store_container'>

                    </section>
                </div>
            </div>
            <div className='main_row6'>
                <h2 className='row6_section_title'>{t('what_our_customers')}</h2>
                <div className='row6_section_container'>
                    <img src={review1} alt="review" className='section_review_comment'/>
                    <img src={review2} alt="review" className='section_review_comment'/>
                </div>
            </div>
        </main>
        <footer className='footer_container'>
            <div className='footer_info_container'>
                <div className='footer_section'>
                    <img src={ibills}  alt='ibils logo' className='amapgs_logo rounded-pill' />
                    {/* <div className='poweredBy'><p className='poweredByTxt'>Powered by: Ojapay Nigeria Limited </p><img className="poweredByImg2" src={ojapay} alt='Ojapay Logo'/></div> */}
                    <ul className='footer_icon_links'>
                        <li><a href='&'><img src={twitter} alt="twitter logo"/></a></li>
                        <li><a href='&'><img src={instagram} alt="instagram logo"/></a></li>
                        <li><a href='&'><img src={coolicon} alt="coolicon logo"/></a></li>
                    </ul>
                </div>
                <div className='footer_section2'>
                    <section className='footer_sub_section'>
                        <ul className='footer_icon_list'>
                            <li><a href='&'>{t('about')}</a></li>
                            <li><a href='&'>{t('contact_us')}</a></li>
                            <li><a href="&">{t('benefits')}</a></li>
                        </ul>
                    </section>
                    <section className='footer_sub_section'>
                        <ul>
                            <li><a href='&'>{t('legal')}</a></li>
                            <li><a href='&'>{t('terms')}</a></li>
                            <li><a href="&">{t('privacy')}</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <hr className='landing_hr'/>
            <p className='footer_copyright_text'>&copy; {t('copyright')} <img className="poweredByImg2" src={ojapay} alt='Ojapay Logo' style={{width: '65px', height: '25px'}}/></p>
        </footer>
    </div>
  )
}

export default Landing