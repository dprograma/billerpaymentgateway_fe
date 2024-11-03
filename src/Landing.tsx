import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillTransfer, faBuilding } from '@fortawesome/free-solid-svg-icons';
import amapgs from './shared/assets/images/amaps.png';
import ojapay from './shared/assets/images/ojapay.png';
import './shared/assets/css/landing.css'; 
import LanguageSwitcher from './LanguageSwitcher';

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      <Container>
        <Row className="justify-content-end">
          <Col md="auto">
            <LanguageSwitcher />
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col md={10}>
            <img src={amapgs} alt="AMAPS Logo" className="logo rounded-pill" />
            <h1 className="display-4">{t('designed_for_africa')}</h1>
            <div className="feature-icons d-flex justify-content-around align-items-center my-4">
              <div>
                <div className="icon-container"><FontAwesomeIcon icon={faCreditCard} size="1x" /></div>
                <span className="mx-2 leads">{t('Pay Bills & Services')}</span>
              </div>
              <div>
              <div className="icon-container"><FontAwesomeIcon icon={faMoneyBillTransfer} size="1x" /></div>
                <span className="mx-2 leads">{t('Transfer & Donate Money')}</span>
              </div>
              <div>
              <div className="icon-container"><FontAwesomeIcon icon={faBuilding} size="1x" /></div>
                <span className="mx-2 leads">{t('Empower your Business')}</span>
              </div>
            </div>

            <div className="mt-5 mb-3 text-center">{t('choose_your_path')}</div>
            <div className="btn-group">
              <NavLink className="btn btn-lg btn-outline-light rounded-pill display-7 mr-3 px-4" to="/customer">{t('customer')}</NavLink>
              <NavLink className="btn btn-lg btn-outline-light rounded-pill display-7 px-4" to="/merchant">{t('merchant')}</NavLink>
            </div>
            <p className="mt-5">
              {t('powered_by')} 
              <NavLink to="https://ojapay.com/">
                <img src={ojapay} style={{ width: '65px', height: '20px' }} alt="OJAPAY Logo" />
              </NavLink>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
