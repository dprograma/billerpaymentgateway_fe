import "./styles/createShop.css";


const CreateShop = (setShowCreateShop: any, setBlur: any) => {
  return (
    <div className='create_shop_modal_wrapper'>
        <div className="create_shop_title_div">
            <p className="create_shop_title">Create Shop</p>
            <button type="button" className="create_shop_modal_close_btn" onClick={() => {setShowCreateShop(false); setBlur(false)}}>X</button>
        </div>
        <form className='create_shop_form'>
            <label className='create_shop_form_label'>
                Name of Shop
                <input className='create_shop_form_input'/>
            </label>
            <label className='create_shop_form_label'>
                Description
                <input className='create_shop_form_input'/>
            </label>
            <div className="create_shop_modal_btns_div">
                <button className="create_shop_modal_cancel_btn" type="button" onClick={() => {setShowCreateShop(false); setBlur(false)}}>Cancel</button>
                <button className="create_shop_modal_submit_btn" type="submit">create</button>
            </div>
        </form>    
    </div>
  )
}

export default CreateShop