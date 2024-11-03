import "./styles/editSubscriptionPlan.css"
import SuccessModal from "./SuccessModal";

const EditSubscriptionPlanModal = (setShowEditPlan: any, setBlur: any) => {
  return (
    <div className='edit_plan_modal_wrapper'>
        <div className="edit_plan_title_div">
            <p className="edit_plan_title">Edit Subscription Plan</p>
            <button type="button" className="edit_plan_modal_close_btn" onClick={() => {setShowEditPlan(false); setBlur(false)}}>X</button>
        </div>
        <form className='edit_plan_form'>
            <label className='edit_plan_form_label'>
                Plan Name
                <input className='edit_plan_form_input'/>
            </label>
            <label className='edit_plan_form_label'>
                Cost of Plan
                <input className='edit_plan_form_input'/>
            </label>
            <label className='edit_plan_form_label'>
                Frequency
                <input className='edit_plan_form_input'/>
            </label>
            <label className='edit_plan_form_label'>
                Plan Description
                <input className='edit_plan_form_input'/>
            </label>
            <div className="edit_plan_modal_btns_div">
                <button className="edit_plan_modal_cancel_btn" type="button" onClick={() => {setShowEditPlan(false); setBlur(false)}}>Cancel</button>
                <button className="edit_plan_modal_submit_btn" type="submit">Save Changes</button>
            </div>
        </form>
        <div>
            
        </div>
    </div>
  )
}

export default EditSubscriptionPlanModal