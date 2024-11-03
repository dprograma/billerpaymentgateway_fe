import "./styles/createPaymentRequestModal.css"
const CreatePaymentRequestModal = (setShowPayReq: any, setBlur: any) => {
  return (
    <div className='create_pay_req_modal_modal_wrapper'>
        <div className="create_pay_req_modal_title_div">
            <p className="create_pay_req_modal_title">Create Payment Request</p>
            <button type="button" className="create_pay_req_modal_modal_close_btn" onClick={() => {setShowPayReq(false); setBlur(false)}}>X</button>
        </div>
        <form className='create_pay_req_modal_form'>
            <label className='create_pay_req_modal_form_label'>
                Customer
                <input className='create_pay_req_modal_form_input'/>
            </label>
            <label className='create_pay_req_modal_form_label'>
                Amount
                <input className='create_pay_req_modal_form_input'/>
            </label>
            <label className='create_pay_req_modal_form_label'>
                Due Date
                <input className='create_pay_req_modal_form_input'/>
            </label>
            <div className="create_pay_req_modal_phone_div">
                <label className='create_pay_req_modal_form_label'>
                    Discount
                    <input className='create_pay_req_modal_form_input'/>
                </label>
                <label className='create_pay_req_modal_form_label'>
                    Tax
                    <input className='create_pay_req_modal_form_input'/>
                </label>
            </div>
            <label className='create_pay_req_modal_form_label'>
                Note
                <input className='create_pay_req_modal_form_input'/>
            </label>
            <div className="create_pay_req_modal_btns_div">
                <button className="create_pay_req_modal_cancel_btn" type="button" onClick={() => {setShowPayReq(false); setBlur(false)}}>Cancel</button>
                <button className="create_pay_req_modal_submit_btn" type="submit">+ Send</button>
            </div>
        </form>
        
    </div>
  )
}

export default CreatePaymentRequestModal