import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { walletToWalletTransfer } from '../../shared/assets/slices/authWalletSlice';
import WalletSelector from '../components/WalletSelector';
import iziToast from 'izitoast';
import Spinner from '../../shared/assets/spinner/spinner';
import WalletTransferOTPModal from '../components/WalletTransferOTPModal';
import '../assets/css/WalletToWallet.css';
import { Modal, Button } from 'react-bootstrap';

interface WalletInputProps {
  donor_currency: string;
  ojapay_tag: string;
  amount: number;
  note: string;
  wallet_pin: string;
  otp: string;
}

interface WalletInputs {
  token: string;
  walletData: WalletInputProps;
}

const WalletToWallet: React.FC = () => {
  const { t } = useTranslation('customer_sendmoney');
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<WalletInputs>();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [walletProps, setWalletProps] = useState<WalletInputs>();
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata;
  const { access_token } = user?.data;

  // Handle wallet selection
  const handleWalletSelect = (wallet: any) => {
    setSelectedWallet(wallet);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => setShowFormModal(false);

  const onSubmit: SubmitHandler<WalletInputs> = async (data) => {
    if (!selectedWallet) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a wallet before transferring.',
      });
      return;
    }

    // Attach selected wallet details to the form data
    data.token = access_token;
    data.walletData.donor_currency = selectedWallet.currency;
    setIsLoading(true);

    try {
      const response = await dispatch(walletToWalletTransfer(data));
      if (response.payload.status === 'success') {
        setWalletProps(data);
        setShowOTPModal(true);
        handleCloseFormModal();
        iziToast.success({
          title: 'Success',
          message: response.payload.response,
        });
      } else {
        iziToast.error({
          title: 'Error',
          message: response.payload.response,
        });
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-to-wallet-container">
      <Spinner isLoading={isLoading} />

      {/* Wallet Selector Component */}
      <WalletSelector onSelectWallet={handleWalletSelect} />

      {/* Form Modal */}
      <Modal show={showFormModal} onHide={handleCloseFormModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('send_money')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="wallet-to-wallet-form">
            <input type="hidden" id="token" {...register('token')} value={access_token} />
            <div className="row form-group">
              <div className="col-md-6">
                <label htmlFor="senderWallet">{t('recipients_tag')}</label>
                <input
                  type="text"
                  id="ojapay_tag"
                  className="form-control"
                  placeholder={t('tag_example')}
                  {...register('walletData.ojapay_tag', { required: t('tag_required') })}
                />
                {errors.walletData?.ojapay_tag && <p className="text-danger">{errors.walletData?.ojapay_tag.message}</p>}
              </div>

              <div className="col-md-6">
                <label htmlFor="recipientWallet">{t('senders_walletId')}</label>
                <input
                  type="password"
                  id="wallet_pin"
                  className="form-control"
                  placeholder={t('pin_example')}
                  {...register('walletData.wallet_pin', { required: t('pin_required') })}
                />
                {errors.walletData?.wallet_pin && <p className="text-danger">{errors.walletData?.wallet_pin.message}</p>}
              </div>

            </div>
            <div className="form-group">
              <label htmlFor="amount">{t('amount')}</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                placeholder={t('amount_example')}
                {...register('walletData.amount', { required: t('amount_required') })}
              />
              {errors.walletData?.amount && <p className="text-danger">{errors.walletData?.amount.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('comment')}</label>
              <textarea
                id="note"
                className="form-control"
                {...register('walletData.note')}
              ></textarea>
            </div>
            <button type="submit" className="submit-button default-theme-color default-white-text-color">{t('send_money')}</button>
          </form>
        </Modal.Body>
      </Modal>
      {walletProps && (
            <WalletTransferOTPModal
              show={showOTPModal}
              walletData={walletProps}
              closeModal={() => setShowOTPModal(false)}
            />
          )}
    </div>
  );
};

export default WalletToWallet;
