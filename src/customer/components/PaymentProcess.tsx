import React from 'react';

const PaymentProcess: React.FC = () => {
    return (
        <div className="col-12 offset-md-3 col-md-6 text-center">
            <h3 className="mb-4">Payment process</h3>
            <p>based on integration</p>
            <div className="spinner-border text-danger mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <button type="button" className="btn btn-danger btn-block">Continue</button>
        </div>
    );
};

export default PaymentProcess;
