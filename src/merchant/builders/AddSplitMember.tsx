import "./styles/addSplitMember.css";


const AddSplitMember = (setShowAddSplitMember: any, setBlur: any) => {
  return (
    <div className='add_split_m_modal_wrapper'>
        <div className="add_split_m_title_div">
            <p className="add_split_m_title">Add Member</p>
            <button type="button" className="add_split_m_modal_close_btn" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>X</button>
        </div>
        <form className='add_split_m_form'>
            <label className='add_split_m_form_label'>
                Name
                <input className='add_split_m_form_input'/>
            </label>
            <label className='add_split_m_form_label'>
                Set Percentage
                <input className='add_split_m_form_input'/>
            </label>
            <label className='add_split_m_form_label'>
                Bank
                <input className='add_split_m_form_input'/>
            </label>
            <label className='add_split_m_form_label'>
                Account Number
                <input className='add_split_m_form_input'/>
            </label>
            <div className="add_split_m_modal_btns_div">
                <button className="add_split_m_modal_cancel_btn" type="button" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>Cancel</button>
                <button className="add_split_m_modal_submit_btn" type="submit">Add</button>
            </div>
        </form>    
    </div>
  )
}

export default AddSplitMember