import "./styles/createPaymentSplit.css";


const CreatePaymentSplit = (setShowEditPaymentSplit: any, setBlur: any) => {
  return (
    <div className='c_paym_split_modal_wrapper'>
        <div className="c_paym_split_title_div">
            <p className="c_paym_split_title">Create Split</p>
            <button type="button" className="c_paym_split_modal_close_btn" onClick={() => {setShowEditPaymentSplit(false); setBlur(false)}}>X</button>
        </div>
        <form className='c_paym_split_form'>
            <label className='c_paym_split_form_label'>
                Name of split
                <input className='c_paym_split_form_input'/>
            </label>
            <label className='c_paym_split_form_label'>
                Currency
                <input className='c_paym_split_form_input'/>
            </label>
            <label className='c_paym_split_form_label'>
                description
                <input className='c_paym_split_form_input'/>
            </label>
            <div className="c_paym_split_radio_div">
                <label className="c_paym_split_radio_sec">
                    <input className='c_paym_split_radio_btn' value="percentage" type="radio"/>
                    Percentage
                </label>
                <label className="c_paym_split_radio_sec">
                    <input className='c_paym_split_radio_btn' value="flat" type="radio"/>
                    Flat rate
                </label>
            </div>
            <div className="c_paym_split_modal_btns_div">
                <button className="c_paym_split_modal_cancel_btn" type="button" onClick={() => {setShowEditPaymentSplit(false); setBlur(false)}}>Cancel</button>
                <button className="c_paym_split_modal_submit_btn" type="submit">create</button>
            </div>
        </form>    
    </div>
  )
}

export default CreatePaymentSplit