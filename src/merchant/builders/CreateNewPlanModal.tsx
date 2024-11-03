import "./styles/createNewPlanModal.css"
import SuccessModal from "./SuccessModal";

const CreateNewPlanModal = (setShowCreateNewPlan: any, setBlur: any) => {
  return (
    <div className='new_plan_modal_wrapper'>
        <div className="new_plan_title_div">
            <p className="new_plan_title">Create Subscription Plan</p>
            <button type="button" className="new_plan_modal_close_btn" onClick={() => {setShowCreateNewPlan(false); setBlur(false)}}>X</button>
        </div>
        <form className='new_plan_form'>
            <label className='new_plan_form_label'>
                Plan Name
                <input className='new_plan_form_input'/>
            </label>
            <label className='new_plan_form_label'>
                Cost of Plan
                <input className='new_plan_form_input'/>
            </label>
            <label className='new_plan_form_label'>
                Frequency
                <input className='new_plan_form_input'/>
            </label>
            <label className='new_plan_form_label'>
                Plan Description
                <input className='new_plan_form_input'/>
            </label>
            <div className="new_plan_modal_btns_div">
                <button className="new_plan_modal_cancel_btn" type="button" onClick={() => {setShowCreateNewPlan(false); setBlur(false)}}>Cancel</button>
                <button className="new_plan_modal_submit_btn" type="submit">Create Plan</button>
            </div>
        </form>
        <div>
            
        </div>
    </div>
  )
}

export default CreateNewPlanModal