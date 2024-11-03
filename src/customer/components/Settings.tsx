import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../assets/css/SendToAfrica.css';

const SendToAfrica: React.FC = () => {
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
    <div className="send-to-africa">
      <h3>Send to Africa</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderAccount">Sender's Account Number</label>
          <input
            type="text"
            id="senderAccount"
            name="senderAccount"
            value={formData.senderAccount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientAccount">Recipient's Account Number</label>
          <input
            type="text"
            id="recipientAccount"
            name="recipientAccount"
            value={formData.recipientAccount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Money</button>
      </form>
    </div>
  );
};

export default SendToAfrica;
