import "./styles/buildEditCustomer.css"
const BuildEditCustomer = (setShowEditCustomer: any, setBlur: any) => {
  return (
    <div className='edit_customer_modal_wrapper'>
        <div className="edit_customer_title_div">
            <p className="edit_customer_title">Edit Customer</p>
            <button type="button" className="edit_customer_modal_close_btn" onClick={() => {setShowEditCustomer(false); setBlur(false)}}>X</button>
        </div>
        <form className='edit_customer_form'>
            <label className='edit_customer_form_label'>
                First Name
                <input className='edit_customer_form_input'/>
            </label>
            <label className='edit_customer_form_label'>
                Last Name
                <input className='edit_customer_form_input'/>
            </label>
            <label className='edit_customer_form_label'>
                Email
                <input className='edit_customer_form_input'/>
            </label>
            <div className="edit_customer_phone_div">
                <label className='edit_customer_form_label'>
                    Code
                    <input className='edit_customer_form_input'/>
                </label>
                <label className='edit_customer_form_label'>
                    Phone Number
                    <input className='edit_customer_form_input'/>
                </label>
            </div>
            <div className="edit_customer_modal_btns_div">
                <button className="edit_customer_modal_cancel_btn" type="button" onClick={() => {setShowEditCustomer(false); setBlur(false)}}>Cancel</button>
                <button className="edit_customer_modal_submit_btn" type="submit">Save Changes</button>
            </div>
        </form>
        
    </div>
  )
}

export default BuildEditCustomer