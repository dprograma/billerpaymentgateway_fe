import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faMobileAlt, faCreditCard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import flutterwave from '../assets/images/flutterwave.png';
import paystack from '../assets/images/paystack.png';
import '../assets/css/PaymentOptions.css';

interface PaymentOptionsProps {
    onPayment: () => void;
    onBankTransfer: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onPayment, onBankTransfer }) => {
    return (
        <div className="payment-options">
            <h5 className="text-center">Pay With</h5>
            <div className="list-group">
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onBankTransfer}>
                    <FontAwesomeIcon icon={faUniversity} className="me-3" />
                    <span>Bank Transfer</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onPayment}>
                    <FontAwesomeIcon icon={faMobileAlt} className="me-3" />
                    <span>USSD</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onPayment}>
                    <FontAwesomeIcon icon={faCreditCard} className="me-3" />
                    <span>Card</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onPayment}>
                    <FontAwesomeIcon icon={faQrcode} className="me-3" />
                    <span>QR Code</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
            </div>
            <div className="text-center my-3">
                <span>Or</span>
            </div>
            <div className="list-group">
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onPayment}>
                    <img src={flutterwave} alt="Flutterwave" className="me-3" style={{ height: '24px' }} />
                    <span>Flutterwave</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={onPayment}>
                    <img src={paystack} alt="PayStack" className="me-3" style={{ height: '24px' }} />
                    <span>PayStack</span>
                    <span className="ms-auto"><FontAwesomeIcon icon="arrow-right" /></span>
                </button>
            </div>
        </div>
    );
};

export default PaymentOptions;
