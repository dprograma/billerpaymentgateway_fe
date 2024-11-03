import "./styles/editRole.css";


const EditRole = ( setShowAddStaff: any , setShowCreateRole: any, setShowEditRole: any, setBlur: any) => {
  return (
    <div className='edit_role_modal_wrapper'>
        <div className="edit_role_title_div">
            <p className="edit_role_title">Edit Role</p>
            <button type="button" className="edit_role_modal_close_btn" onClick={() => {setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(false); setBlur(false)}}>X</button>
        </div>
        <form className='edit_role_form'>
            <label className='edit_role_form_label'>
                Name the Permission
                <input className='edit_role_form_input'/>
            </label>
            <label className='edit_role_form_label'>
                Select Access
                <input className='edit_role_form_input'/>
            </label>
            <div className="edit_role_modal_btns_div">
                <button className="edit_role_modal_cancel_btn" type="button" onClick={() => {setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(false); setBlur(false)}}>Cancel</button>
                <button className="edit_role_modal_submit_btn" type="submit">Save</button>
            </div>
        </form>    
    </div>
  )
}

export default EditRole