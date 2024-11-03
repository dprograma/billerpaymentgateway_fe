import "./styles/createRole.css";


const AddStaff = (setShowAddSplitMember: any, setBlur: any) => {
  return (
    <div className='create_role_modal_wrapper'>
        <div className="create_role_title_div">
            <p className="create_role_title">Create Role</p>
            <button type="button" className="create_role_modal_close_btn" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>X</button>
        </div>
        <form className='create_role_form'>
            <label className='create_role_form_label'>
                Name the Permission
                <input className='create_role_form_input'/>
            </label>
            <label className='create_role_form_label'>
                Select Access
                <input className='create_role_form_input'/>
            </label>
            <div className="create_role_modal_btns_div">
                <button className="create_role_modal_cancel_btn" type="button" onClick={() => {setShowAddSplitMember(false); setBlur(false)}}>Cancel</button>
                <button className="create_role_modal_submit_btn" type="submit">Create</button>
            </div>
        </form>    
    </div>
  )
}

export default AddStaff