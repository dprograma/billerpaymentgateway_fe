import React from 'react';
import './styles/buildMerchants.css';

type MerchantProps = {
    id: number;
    merchantName: string,
    products: string,
    totalOrders: string,
    totalSales: string,
    action: string
}

const BuildMerchant = (merchant: MerchantProps) => {
  return (
    <div className={merchant.id % 2 === 0? 'merch_sec gray' : 'merch_sec '}>
        <p className='merch_txt'>{merchant.merchantName}</p>
        <p className='merch_txt'>{merchant.products}</p>
        <p className='merch_txt'>{merchant.totalOrders}</p>
        <p className='merch_txt'>{merchant.totalSales}</p>
        <p className='merch_txt'>
            <p className='merch_action '>{merchant.action}</p>
        </p>
    </div>
  )
}

export default BuildMerchant