import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

// Import logos
import PAPSSLogo from '../../shared/assets/images/papss.png';
import VisaLogo from '../../shared/assets/images/visa.png';
import MasterCardLogo from '../../shared/assets/images/mastercard.png';

import '../assets/css/FundWalletPanel.css';


interface PaymentOptionModalProps {
    show: boolean;
    onHide: () => void;
    onProceed: (paymentOption: string) => void;
    selectedCountry: string | null;
    africaCountries: string[]
}


const PaymentOptionModal: React.FC<PaymentOptionModalProps> = ({ show, onHide, onProceed, selectedCountry, africaCountries }) => {
    console.log("selected country: ", selectedCountry)
    console.log("african country: ", africaCountries)
    const isNigeria = selectedCountry === 'Nigeria';
    const isAfrican = selectedCountry && africaCountries.includes(selectedCountry) && selectedCountry !== 'Nigeria';
    console.log("is nigerian: ", isNigeria)
    console.log("is african: ", isAfrican)

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100">Choose Payment Method</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center ps-5 pe-5">
                <Row className="d-flex flex-column align-items-center">
                    <Col xs={12} className="mb-3">
                        <Button
                            variant="outline-secondary"
                            onClick={() => onProceed('wallet')}
                            className="d-flex align-items-center justify-content-center form-control custom-button-secondary"
                        >
                            <span>Pay with Wallet</span>
                        </Button>
                    </Col>
                    {isNigeria && (
                        <Col xs={12} className="mb-3">
                            <Button
                                variant="primary"
                                onClick={() => onProceed('default')}
                                className="w-100 d-flex align-items-center justify-content-center form-control custom-button-primary"
                            >
                                <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                                Make Payment
                            </Button>
                        </Col>
                    )}

                    {/* Divider */}
                    <div className="text-center my-3 alternative-options-divider">
                        <span>Alternative Payment Options</span>
                    </div>

                    {isNigeria || isAfrican ? (
                        <Col xs={12} className="mb-3">
                            <Button
                                variant="outline-secondary"
                                onClick={() => onProceed('PAPSS')}
                                className="d-flex align-items-center justify-content-between form-control custom-button-secondary"
                            >
                                <span>PAPSS</span>
                                <img src={PAPSSLogo} alt="PAPSS Logo" className="payment-logo" />
                            </Button>
                        </Col>
                    ) : (
                        <>
                            <Col xs={12} className="mb-3">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => onProceed('Visa')}
                                    className="d-flex align-items-center justify-content-between form-control custom-button-secondary"
                                >
                                    <span>Visa</span>
                                    <img src={VisaLogo} alt="Visa Logo" className="payment-logo" />
                                </Button>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <Button
                                    variant="outline-warning"
                                    onClick={() => onProceed('MasterCard')}
                                    className="d-flex align-items-center justify-content-between form-control custom-button-secondary"
                                >
                                    <span>MasterCard</span>
                                    <img src={MasterCardLogo} alt="MasterCard Logo" className="payment-logo" />
                                </Button>
                            </Col>
                        </>
                    )}
                </Row>
            </Modal.Body>
        </Modal>
    );
};


export default PaymentOptionModal;
