import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { useDispatch } from 'react-redux';
import { env } from '../../shared/assets/environment/envSelector';
import axios from 'axios';
import { useSelector } from 'react-redux';
import iziToast from 'izitoast';
import CurrencyDisplay from './CurrencyDisplay';
import { walletToWalletTransfer, sendDonationDetails } from '../../shared/assets/slices/authWalletSlice';
import WalletTransferOTPModal from './WalletTransferOTPModal';
import Spinner from '../../shared/assets/spinner/spinner';


type WalletInputs = {
  token: string,
  walletData: {
    ojapay_tag: string;
    amount: number;
    note: string;
    wallet_pin: string;
    recipient_amount: number;
    donor_currency: string;
    recipient_currency: string;
    otp: string;
  }
}

interface DonationPayloadProps {
  recipient_id: number; 
  currency: string;
  amount: number;
  donor_id: number;
  description: string;
}

interface DonationModalProps {
  recipientId: number;
  recipientName: string;
  recipientCurrency: string;
  recipientCountry: string;
  recipientWalletTag: string; 
  donorCurrency: string;
  donorCountry: string;
  donorWalletBalance: number;
  donorId: number;
  show: boolean;
  handleClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  recipientId,
  recipientName,
  recipientCurrency,
  recipientCountry,
  recipientWalletTag,
  donorCurrency,
  donorCountry,
  donorWalletBalance,
  donorId,
  show,
  handleClose
}) => {
  console.log("recipient wallet tag: ", recipientWalletTag)
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [walletPin, setWalletPin] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [conversionRate, setConversionRate] = useState<number>(1);
  const [walletProps, setWalletProps] = useState<WalletInputs>();
  const [donationProps, setDonationProps] = useState<DonationPayloadProps>();
  const [conversionAccepted, setConversionAccepted] = useState<boolean>(false);
  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata;
  const { access_token = '' } = user?.data || {};
  const { getCurrencyList, getExchangeRate, makeWalletUpdate } = env;

  const handleConversion = () => {
    const headers = {
      headers: {
          "Authorization": `Bearer ${access_token}`
      }
  };
    axios.get(`${getExchangeRate}?from=${donorCurrency}&to=${recipientCurrency}`, headers)
      .then(response => {
        console.log("response from donation modal: ", response.data.data.rate)
        const rate = response.data.data.rate;  
        const converted = amount * rate;
        setConvertedAmount(converted);
        setConversionRate(rate);
      })
      .catch(error => {
        iziToast.error({
          title: 'Error',
          message: 'Error fetching conversion rate',
        })
      });
  };

  const handleDonation = async () => {
    if (!conversionAccepted) {
      iziToast.error({
        title: 'Error',
        message: 'Please accept the conversion rate first.',
      });
      return;
    }
  
    if (donorWalletBalance < amount) {
      iziToast.error({
        title: 'Error',
        message: 'Insufficient wallet balance.',
      });
      return;
    }
  
    const walletPayload: WalletInputs = {
      token: access_token,
      walletData: {
        ojapay_tag: recipientWalletTag,
        amount: amount,
        note: description,
        wallet_pin: walletPin,
        recipient_amount: convertedAmount,
        donor_currency: donorCurrency,
        recipient_currency: recipientCurrency,
        otp: '',
      }
    };
  
    try {
      // First, make the wallet transfer
      const walletResponse = await dispatch(walletToWalletTransfer(walletPayload));
      console.log("wallet payload: ", walletPayload)
      console.log("response from donations: ", walletResponse)
      setIsLoading(true);
      
      if (walletResponse.payload.status === 'success') {
        setWalletProps(walletPayload)
        setShowOTPModal(true)
        // Save the donation details
        const donationPayload: DonationPayloadProps = {
          donor_id: donorId, 
          recipient_id: recipientId,
          amount: parseFloat(convertedAmount.toFixed(2)),
          currency: recipientCurrency,
          description: description,
        };

        setDonationProps(donationPayload);
    
      } else {
        iziToast.error({
          title: 'Error',
          message: walletResponse?.payload?.response || 'Wallet transfer failed.',
        });
      }

    }catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again!'
      })
    }finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Spinner isLoading={isLoading} />
      <Modal.Header closeButton>
        <Modal.Title className="mx-auto"><p className="text-secondary text-center fs-5">Donate to {recipientName} ({recipientCountry}) <span className="badge default-theme-color">{recipientCurrency}</span></p></Modal.Title>
      </Modal.Header>
      <Modal.Body className="pe-5 ps-5">
        <Form>
          <Form.Group controlId="amount">
            <Form.Label><p className="text-secondary text-center fs-6">Enter Amount ({donorCurrency})</p></Form.Label>
            <Form.Control
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount to donate"
            />
          </Form.Group>

          <Button className="default-theme-color default-border-color mt-3" onClick={handleConversion}>
            Convert to {recipientCurrency}
          </Button>

          {convertedAmount > 0 && (
            <div className="mt-3">
              <p className="text-secondary text-center fs-6">Conversion Rate: {conversionRate}</p>
              <p className="text-secondary text-center fs-6">Converted Amount: <span className="text-success fw-bold">{<CurrencyDisplay amount={convertedAmount} currency={recipientCurrency} />}</span></p>
              <Form.Check 
                className="default-form-check"
                type="checkbox"
                label="I accept the conversion rate"
                onChange={(e) => setConversionAccepted(e.target.checked)}
              style={{color: "#b20c02"}}/>
            </div>
          )}

          <Form.Group controlId="walletPin" className="mt-3">
            <Form.Label><p className="text-secondary text-center fs-6">Wallet Pin</p></Form.Label>
            <Form.Control
              type="password"
              value={walletPin}
              onChange={(e) => setWalletPin(e.target.value)}
              placeholder="Enter your wallet pin"
            />
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label><p className="text-secondary text-center fs-6">Description</p></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for your donation"
            />
          </Form.Group>

          {/* Hidden field holding recipient wallet tag */}
          <input type="hidden" value={recipientWalletTag} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="default-theme-color default-border-color default-white-text-color" onClick={handleDonation} disabled={!conversionAccepted}>
          Send Donation
        </Button>
      </Modal.Footer>
    </Modal>
     {walletProps && (
      <WalletTransferOTPModal
        show={showOTPModal}
        walletData={walletProps}
        closeModal={() => setShowOTPModal(false)}
        donationProps={donationProps}
      />
    )}
    </>
  );
};

export default DonationModal;
