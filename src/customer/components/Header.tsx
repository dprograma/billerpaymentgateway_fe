import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SearchInput from "./searchInput";
import ojapay from '../../shared/assets/images/ojapay.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { logout, resetAuthState } from '../../shared/assets/slices/authWalletSlice';
import profile from "../assets/images/avatar.png";
import { faCog, faPlusCircle, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import MenuPanel from "./MenuPanel";
import "../assets/css/Header.css";
import iziToast from "izitoast";
import LanguageSwitcher from '../../LanguageSwitcher';
import Spinner from '../../shared/assets/spinner/spinner';


const Header: React.FC = () => {
  const { t } = useTranslation('customer_header');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userdata = useSelector((state: RootState) => state.authWallet.user);
  const { access_token='' } = userdata?.data || {};
  const { first_name='', last_name='', avatar='', username='' } = userdata?.data?.user || {};

  const handleLogOut = async () => {
    setIsLoading(true);
try {
  if (access_token) {
      const response = await dispatch(logout(access_token));
      console.log("logout response: ", response);
      if (response.payload.status === 'success') {
        dispatch(resetAuthState());
        navigate('/customer');
        iziToast.success({
          title: 'OK',
          message: 'User logged out successfully!',
        });
      }
    }
}catch (error) {
  iziToast.error({
    title: 'Error',
    message: "Something went wrong"
  })
}finally {
  setIsLoading(false);
}
    
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white panel-shadow sticky-top">
      <Spinner isLoading={isLoading} />
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-5" to="/customer">
          <img src={ojapay} alt='amaps logo' className="rounded-pill img-fluid" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{t('menu')}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <form className="d-flex mx-auto mb-3" role="search">
              <SearchInput />
            </form>
            <div className="navbar-nav">
              <div className="nav-item dropdown">
                <NavLink className="d-inline-flex nav-link dropdown-toggle mb-4" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile} className="rounded-circle avatar" alt="avatar" />
                  {first_name} {last_name}
                  <FontAwesomeIcon icon={faPlusCircle} className="add-icon ms-2" />
                </NavLink>
                <p className="d-block d-md-none"><span className="badge text-bg-secondary fs-6 p-2">Tag: {username}</span></p>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item mb-3 ts-13" to="/profile"><FontAwesomeIcon icon={faUser} className="add-icon-sm mx-2" /> {t('profile')}</NavLink></li>
                  <li><NavLink className="dropdown-item mb-3 ts-13" to="/settings"><FontAwesomeIcon icon={faCog} className="add-icon-sm mx-2" /> {t('settings')}</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink to="#" className="dropdown-item mb-3 ts-13"><FontAwesomeIcon icon={faSignOut} className="add-icon-sm mx-2" onClick={handleLogOut} /> {t('logout')}</NavLink></li>
                </ul>
              </div>
              <div className="d-flex d-md-none">
                <MenuPanel />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center ms-auto me-3">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Header;
