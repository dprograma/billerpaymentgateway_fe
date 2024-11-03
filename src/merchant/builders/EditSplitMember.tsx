import "./styles/editSplitMember.css";


const EditSplitMember = (setShowEditSplitMember: any, setBlur: any) => {
  return (
    <div className='edit_split_m_modal_wrapper'>
        <div className="edit_split_m_title_div">
            <p className="edit_split_m_title">Edit Member</p>
            <button type="button" className="edit_split_m_modal_close_btn" onClick={() => {setShowEditSplitMember(false); setBlur(false)}}>X</button>
        </div>
        <form className='edit_split_m_form'>
            <label className='edit_split_m_form_label'>
                Name
                <input className='edit_split_m_form_input'/>
            </label>
            <label className='edit_split_m_form_label'>
                Set Percentage
                <input className='edit_split_m_form_input'/>
            </label>
            <label className='edit_split_m_form_label'>
                Bank
                <input className='edit_split_m_form_input'/>
            </label>
            <label className='edit_split_m_form_label'>
                Account Number
                <input className='edit_split_m_form_input'/>
            </label>
            <div className="edit_split_m_modal_btns_div">
                <button className="edit_split_m_modal_cancel_btn" type="button" onClick={() => {setShowEditSplitMember(false); setBlur(false)}}>Cancel</button>
                <button className="edit_split_m_modal_submit_btn" type="submit">Save</button>
            </div>
        </form>    
    </div>
  )
}

export default EditSplitMember