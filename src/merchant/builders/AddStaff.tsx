import "./styles/addStaff.css";


const AddStaff = (setShowAddSplitMember: any, setBlur: any) => {
  return (
    <div className='add_staff_modal_wrapper'>
        <div className="add_staff_title_div">
            <p className="add_staff_title">Add Staff</p>
            <button type="button" className="add_staff_modal_close_btn" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>X</button>
        </div>
        <form className='add_staff_form'>
            <label className='add_staff_form_label'>
                Name of Staff
                <input className='add_staff_form_input'/>
            </label>
            <label className='add_staff_form_label'>
                Email of Staff
                <input className='add_staff_form_input'/>
            </label>
            <label className='add_staff_form_label'>
                Role
                <input className='add_staff_form_input'/>
            </label>
            <div className="add_staff_modal_btns_div">
                <button className="add_staff_modal_cancel_btn" type="button" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>Cancel</button>
                <button className="add_staff_modal_submit_btn" type="submit">Create</button>
            </div>
        </form>    
    </div>
  )
}

export default AddStaff