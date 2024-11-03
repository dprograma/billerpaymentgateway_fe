import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./styles/login.css";
import merchHero from "./assets/1.png";
import iBillsLogo from "./assets/amaps.png";
import { useNavigate } from "react-router-dom";
import HandleSubmit from "./components/HandleSubmit";
import { env } from "../shared/assets/environment/envSelector";
import { setPacketStatus, setMessage, setIsAuthenticated, setGetUser, setGetWallet } from '../shared/assets/slices/authSlice';
import { useDispatch } from "react-redux";
import ojapay from "../shared/assets/images/ojapay.png"
import LanguageSwitcherMerchant from '../LanguageSwitcherMerchant';
import Spinner from '../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


const Login = () => {
  const { t } = useTranslation('merchant_login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);  
  const { login } = env;

  const payload = {
    email: emailOrPhone,
    password: password
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = {
      headers: { "Content-type": "application/json" },
    };
    setIsLoading(true);
    try {
      await HandleSubmit(e, payload, login, "POST", setPacketStatus, setStatusMessage, setUser, undefined, headers);

    }catch (error) {
      iziToast.error({
        title: "Error",
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("user data from login: ", user);
      dispatch(setIsAuthenticated(true));
      dispatch(setGetUser(user));
      navigate("/merchant/dashboard");
    }
  }, [user, dispatch, navigate]);

  return (
    <main className='login'>
      <Spinner isLoading={isLoading} />
      <div className="column1_signin">
        <div className="wrapper1">
          <div className="d-flex flex-row justify-content-between">
            <img src={ojapay} className='amapgs_logo rounded-pill' alt="instant bills pay logo" onClick={() => navigate("/merchant")} />
          <LanguageSwitcherMerchant/>
          </div>
          
          <form className='login_form' onSubmit={handleLogin}>
            <h2 className='login_title'>{t('merchant_login')}</h2>
            <div className='login_credentials'>
              <label className='email_phone_l'>{t('email_or_phone')}<br />
                <input className='email+phone set_input' type="text" onChange={(e) => setEmailOrPhone(e.target.value)} />
              </label><br />
              <label className='password_l'>{t('password')}<br />
                <input className='password set_input' type="password" onChange={(e) => setPassword(e.target.value)} />
              </label><br />
            </div>
            <button type='submit' className="button1">{t('login')}</button>
            <div className="d-flex justify-content-center"><a href="$" className="forgot_password_link">{t('forgot_password')}</a></div>
            
          </form>
          <h2 className="create_account_title">{t('dont_have_account')}</h2>
          <button className="button2" onClick={() => navigate("/merchant/signup")}>{t('create_account')}</button>
        </div>
      </div>
      <div className='column2_signin'>
        <img src={merchHero} alt="hero_img" className="hero_img" />
      </div>
    </main>
  );
};

export default Login;
