import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../shared/assets/stores/store';
import { env } from '../../shared/assets/environment/envSelector';
import Window from "../Window";
import iziToast from 'izitoast';
import Spinner from '../../shared/assets/spinner/spinner';
import './styles/SetWalletPin.css';


type Props = {};

const SetWalletPinView: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>('');
  const { setWalletPin } = env;
  const { getUser } = useSelector((state: RootState) => state.auth);
  const { access_token = '', user = '', wallet } = getUser || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (pin !== confirmPin) {
      iziToast.error({ title: 'Error', message: 'Pins do not match' });
      return;
    }

    try {
      const response = await axios.post(
        setWalletPin,
        { wallet_pin: pin },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 200) {
        iziToast.success({ title: 'Success', message: 'PIN set successfully' });
        setPin('');
        setConfirmPin('');
      } else {
        iziToast.error({ title: 'Error', message: 'Failed to set PIN' });
      }
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'An error occurred' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="set-wallet-pin mt-5">
      <Spinner isLoading={isLoading} />
      <h2>Set Wallet PIN</h2>
      <form onSubmit={handleSubmit} className="set-wallet-pin-form">
        <div className="form-group">
          <label htmlFor="pin">PIN</label>
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPin">Confirm PIN</label>
          <input
            id="confirmPin"
            type="password"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="btn">Set PIN</button>
      </form>
    </div>
  );
};

const SetWalletPin: React.FC = () => {
  const content = {
    currentView: <SetWalletPinView />,
    activeId: 10,
  };
  return (
    <Window currentView={content.currentView} activeId={content.activeId} />
  );
};

export default SetWalletPin;
