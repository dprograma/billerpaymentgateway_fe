import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, setGetProduct } from '../../shared/assets/slices/authSlice';
import "./styles/buildProduct.css"
import {
  FaRegTrashCan,
  FaPencil
} from "react-icons/fa6";
import axios from 'axios';
import { env } from '../../shared/assets/environment/envSelector';


type BuildProductProps = {
  image: string,
  qty: string,
  price: string, 
  name: string,
  text?: string,
  user: {
    profile_picture: string
  },
  onEdit: (product: any) => void;
  onDelete: () => void;
}

const BuildProduct = (product: BuildProductProps) => {
  const { getUser } = useSelector((state: { auth: authState }) => state.auth);
  const { access_token = '', user = '', wallet } = getUser || {}
  const [currency, setCurrency] = useState<any>();
  const { walletList } = env;

  useEffect(() => {
    // Fetch custom billers
    const fetchCustomBillers = async () => {
        const headers = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        };
        try {
            const response = await axios.get(walletList, headers);
            console.log("billers: ", response.data.data[0])
            if (response?.data?.status === 'success') {
                const { currency } = response?.data?.data[0]
                setCurrency(currency)
            }
        } catch (error) {
            console.error('Error fetching custom billers:', error);
        }
    };

    fetchCustomBillers();
}, [access_token, walletList]);

  return (
    <div className="product_section">
        <div className='product_info_div'>
            <img src={product.user.profile_picture}/>
            <div className='product_wrapper'>
              <div className='product_info_ln1'>
                <p className="product_name product_txt">{product.name}</p>
                <p className="product_qty product_txt">{product.qty}</p> 
              </div>
              <div className='product_info_ln2'>
                <p className="product_desc product_txt">{product.text}</p> 
                <p className="product_price product_txt">{currency}{product.price}</p> 
              </div>
            </div>  
        </div> 
        <div className="product_action_div">
            <button type='button' className='product_del_btn' onClick={product.onDelete}><FaRegTrashCan size={15}/></button>
            <button type='button' className='product_edit_btn' onClick={product.onEdit}><FaPencil size={15}/></button>
        </div>
    </div>
  )
}

export default BuildProduct