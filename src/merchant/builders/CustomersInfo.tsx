import {
    FaMagnifyingGlass
} from "react-icons/fa6";
import "./styles/customerInfo.css"
import { 
    FaRegTrashCan 
} from "react-icons/fa6";

type Props = {}

const CustomersInfo = () => {
  return (
    <div className={'view_screen'}>
        <div className="cust_info_super_container">
            <div className="cust_info_header_info">
                <p className="cust_info_header_title">Customers</p>
                <p className='cust_info_desc_text'>Effortlessly create, organize, and manage your custome base</p>
                <button type="button" className="cust_info_addNewCustomer_btn">+ Add New Customer</button>
            </div>
            <div className='cust_info_search_bar_container'>
                <div className='cust_info_search_box'>
                    <FaMagnifyingGlass size={30} color='#667085'/>
                    <input placeholder='Search' type='search' id='cust_info_search_input'/>
                </div>
                <select className="cust_info_search_filter">
                    <option value="">Filter</option>
                    <option value="date_filter">Filter by date</option>
                    <option value="amount_filter">Filter by amount</option>
                </select>
            </div>
            <div className="cust_info_container">
                <div className="cust_info_header">
                    <p className="cust_info_text">Full Name</p>
                    <p className="cust_info_text">Email</p>
                    <p className="cust_info_text">Phone Number</p>
                    <p className="cust_info_text">Date Added</p>
                    <p className="cust_info_text">Actions</p>
                </div>
                <hr className="cust_info_hr" />
                <div className="cust_info_section">
                    <p className="cust_info_text_ln">Segun John</p>
                    <p className="cust_info_text_ln">segunjohn@mail.com</p>
                    <p className="cust_info_text_ln">+234 805584984</p>
                    <p className="cust_info_text_ln">Jan 01, 2023</p>
                    <div className="cust_info_action_div">
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        <button className="edit_button" type="button"></button>
                    </div>      
                </div>
                <hr className="cust_info_hr" />
                <div className="cust_info_section">
                    <p className="cust_info_text_ln">Segun John</p>
                    <p className="cust_info_text_ln">segunjohn@mail.com</p>
                    <p className="cust_info_text_ln">+234 805584984</p>
                    <p className="cust_info_text_ln">Jan 01, 2023</p>
                    <div className="cust_info_action_div">
                        <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        <button className="edit_button" type="button"></button>
                    </div>      
                </div>
                <hr className="cust_info_hr" />
                
            </div>
        </div>
    </div>
  )
}

export default CustomersInfo