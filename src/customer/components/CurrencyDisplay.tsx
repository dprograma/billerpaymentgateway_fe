import React from 'react';

const CurrencyDisplay: React.FC<{ amount: string | number; currency: string }> = ({ amount, currency }) => {
    const formattedAmount = formatCurrency(amount, currency);

    return (
        <div>{formattedAmount}</div>
    );
};

const formatCurrency = (amount: string | number, currency: string): string => {
    const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericAmount);
};

export default CurrencyDisplay;
