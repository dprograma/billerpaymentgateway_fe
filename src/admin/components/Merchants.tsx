import React from 'react'
import {
    FaBagShopping,
    FaShop,
    FaMagnifyingGlass,
    FaPeopleGroup,
    FaLinesLeaning,
    FaRegFileLines

} from "react-icons/fa6";
import Window from '../Window';
import "./styles/merchants.css";
import BuildMerchants from '../builders/BuildMerchants';

type Props = {}

const MerchantsView = (props: Props) => {

       const merchants = [
        {
            id: 1,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 2,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 3,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 4,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 5,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 6,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 7,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 8,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 9,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
        {
            id: 10,
            merchantName: "Cakes and stuff",
            products: "21",
            totalOrders: "59",
            totalSales: "N489,500",
            action: "Details"
        },
    ]
  return (
    <div className='merch_sup_cont'>
        <h2 className='merch_title1'>Merchants</h2>
        <div className='merch_overview'>
            <div className='merch_overview_sec'>
                <FaBagShopping size={30} color='#EA580C' className='merch_overview_icn'/>
                <div>
                    <p className='merch_overview_desc'>Total Merchants</p>
                    <p className='merch_overview_amt'>483</p>
                </div>
            </div>
            <div className='merch_overview_sec'>
                <FaLinesLeaning size={30} color='#9333EA' className='merch_overview_icn'/>
                <div>
                    <p className='merch_overview_desc'>Total Orders</p>
                    <p className='merch_overview_amt'>1,326</p>
                </div>
            </div>
        </div>
        <div className='merch_merch_cont'>
            <div className='merch_search_cont'>
                <div className='merch_search_input_wrpr'>
                    <input type="search" className='merch_search_box'/>
                    <FaMagnifyingGlass size={30} color='#OOOOOO' className='merch_search_icn'/>
                </div>
                <button className='merch_search_btn'>
                    <p>Filter</p>
                </button>
            </div>
            <div className='merch_merch_hd'>
                <p className='merch_merch_hd_txt'>Merchant Name</p>
                <p className='merch_merch_hd_txt'>Products</p>
                <p className='merch_merch_hd_txt'>Total Orders</p>
                <p className='merch_merch_hd_txt'>Total Sales</p>
                <p className='merch_merch_hd_txt'>Action</p>
            </div>
            <div>
                {merchants.map((merchant) => BuildMerchants(merchant))} 
            </div>
        </div>

    </div>
  )
}
const Merchants = () => {
    const content = {
        currentView: <MerchantsView />,
        activeId: 3
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}
export default Merchants