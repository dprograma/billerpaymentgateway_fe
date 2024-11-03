import "./styles/buildAddCustomer.css"


const BuildAddCustomer = (setShowAddCustomer: any, setBlur: any) => {
  return (
    <div className='add_customer_modal_wrapper'>
        <div className="add_customer_title_div">
            <p className="add_customer_title">Add Customer</p>
            <button type="button" className="add_customer_modal_close_btn" onClick={() => {setShowAddCustomer(false); setBlur(false)}}>X</button>
        </div>
        <form className='add_customer_form'>
            <label className='add_customer_form_label'>
                First Name
                <input className='add_customer_form_input'/>
            </label>
            <label className='add_customer_form_label'>
                Last Name
                <input className='add_customer_form_input'/>
            </label>
            <label className='add_customer_form_label'>
                Email
                <input className='add_customer_form_input'/>
            </label>
            <div className="add_customer_phone_div">
                <label className='add_customer_form_label'>
                    Code
                    <input className='add_customer_form_input'/>
                </label>
                <label className='add_customer_form_label'>
                    Phone Number
                    <input className='add_customer_form_input'/>
                </label>
            </div>
            <div className="add_customer_modal_btns_div">
                <button className="add_customer_modal_cancel_btn" type="button" onClick={() => {setShowAddCustomer(false); setBlur(false)}}>Cancel</button>
                <button className="add_customer_modal_submit_btn" type="submit">ok</button>
            </div>
        </form>
        
    </div>
  )
}

export default BuildAddCustomer