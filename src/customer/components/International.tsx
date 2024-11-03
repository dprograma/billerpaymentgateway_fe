import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/css/International.css';

const International: React.FC = () => {
  const { t } = useTranslation('customer_sendmoney');
  const [formData, setFormData] = useState({
    senderAccount: '',
    recipientAccount: '',
    amount: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="international-container">
      <h3 className="international-title">{t('international_transfer')}</h3>
      <form className="international-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderAccount">{t('senders_acctno')}</label>
          <input
            type="text"
            id="senderAccount"
            name="senderAccount"
            value={formData.senderAccount}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientAccount">{t('recipients_acctno')}</label>
          <input
            type="text"
            id="recipientAccount"
            name="recipientAccount"
            value={formData.recipientAccount}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">{t('amount')}</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">{t('description')}</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="submit-button default-theme-color default-white-text-color">{t('send_money')}</button>
      </form>
    </div>
  );
};

export default International;
