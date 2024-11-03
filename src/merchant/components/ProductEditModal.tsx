import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authState } from '../../shared/assets/slices/authSlice';
import { env } from '../../shared/assets/environment/envSelector';
import axios from 'axios';
import iziToast from 'izitoast';
import Spinner from '../../shared/assets/spinner/spinner';


type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  user: {
    profile_picture: string;
    business_name: string;
  };
  created_at: string;
  updated_at: string;
  image: string;
  qty: string;
  text?: string;
};

// Modal Component
type ModalProps = {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
};

const Modal: React.FC<ModalProps> = ({ product, onClose, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const { getUser } = useSelector((state: { auth: authState }) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { access_token = '' } = getUser || {};
  const { deleteUpdateProduct } = env;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
    console.log("edited product: ", editedProduct)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    };
    setIsLoading(true);
    try {
      axios.put(`${deleteUpdateProduct}${editedProduct.id}`, {
        ...editedProduct,
        category_id: editedProduct.category.id
      }, headers)
        .then(response => {
          if (response.status === 200) {
            iziToast.success({
              title: 'Success',
              message: "Product successfully updated",
            });
          }

        })
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: "There was an error updating the product!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    if (isLoading) {
      console.log("is Loading: ", isLoading)
    }
  })

  return (
    <div className="modal_main">
      <Spinner isLoading={isLoading} />
      <div className="modal_content">
        <div className="modal_header">
          <h2>Edit Product</h2>
          <button className="modal_close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal_body">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal_footer">
            <button type="submit">Save Changes</button>
            <button type="button" className="cancel_button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;