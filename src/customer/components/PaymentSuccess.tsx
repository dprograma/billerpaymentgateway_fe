import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleDone = () => {
        navigate('/dashboard'); 
    };

    return (
        <div className="col-12 offset-md-3 col-md-6 text-center">
            <div className="success-icon">
                <i className="fas fa-check-circle" style={{ fontSize: '5rem', color: 'green' }}></i>
            </div>
            <h3 className="mt-4">You have successfully funded your account</h3>
            <button type="button" className="btn btn-danger btn-block mt-3" onClick={handleDone}>Done</button>
        </div>
    );
};

export default PaymentSuccess;

