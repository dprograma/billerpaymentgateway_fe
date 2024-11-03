import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCircleLeft } from "react-icons/fa6";
import "./styles/products.css";
import BuildProduct from "../builders/BuildProduct";
import { useSelector } from 'react-redux';
import { authState } from '../../shared/assets/slices/authSlice';
import { useNavigate } from "react-router-dom";
import { env } from '../../shared/assets/environment/envSelector';
import Window from "../Window";
import Modal from './ProductEditModal';
import iziToast from 'izitoast';
import './styles/modal.css'


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

type Merchant = {
  business_name: string;
  description: string;
  products: Product[];
};

const ProductsView = () => {
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { getUser } = useSelector((state: { auth: authState }) => state.auth);
  const { access_token = '' } = getUser || {};
  const { createProduct, deleteUpdateProduct } = env;

  // Fetch products
  useEffect(() => {
    const headers = {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    };
    axios.get(createProduct, headers)
      .then(response => {
        const data = response.data.data;
        setMerchant({
          business_name: data[0]?.user?.business_name,
          description: data[0]?.category?.description,
          products: data,
        });
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, [access_token, createProduct]);

  useEffect(() => {
    if (merchant) {
      console.log('Updated merchant:', merchant);
    }
  }, [merchant]);


  const handleDelete = (productId: number): void => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      id: 'question',
      zindex: 999,
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this product?',
      position: 'center',
      buttons: [
        [
          '<button><b>YES</b></button>',
          (instance, toast, button, event, inputs) => {
            // Proceed with the delete action
            axios.delete(`${deleteUpdateProduct}${productId}`, {
              headers: {
                "Authorization": `Bearer ${access_token}`
              }
            })
              .then(() => {
                // Update the state to remove the deleted product
                setMerchant((prevMerchant) => {
                  if (!prevMerchant) return null;
                  return {
                    ...prevMerchant,
                    products: prevMerchant.products.filter(product => product.id !== productId),
                  };
                });
              })
              .catch(error => {
                console.error("There was an error deleting the product!", error);
              });

            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          },
          true
        ],
        [
          '<button>NO</button>',
          (instance, toast, button, event, inputs) => {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          },
          true
        ]
      ],
    });
  };

  const handleEdit = (product: Product) => {
    console.log("handle edit product: ", product)
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log("model open: ", isModalOpen)
    console.log("selected product: ", selectedProduct)
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setMerchant(prevMerchant => {
      if (!prevMerchant) return null;
      return {
        ...prevMerchant,
        products: prevMerchant.products.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
      };
    });
    handleModalClose();
  };

  return (
    <div className="products_super_container">
      <div className="products_header_info">
        <div className="products_title_wrapper">
          <FaCircleLeft size={30} color="#B20C02" onClick={() => navigate(-1)} />
          <p className="products_header_title">{merchant?.business_name}</p>
        </div>
        <button type="button" className="products_addNewproduct_btn" onClick={() => navigate('/merchant/create-product')}>+ Add Product</button>
      </div>
      <hr className="products_hr" />
      <div className="products_cat_container">
        <div className="products_cat_info_wrapper">
          <p className="products_cat_desc_title">Description</p>
          <p className="products_text">{merchant?.description}</p>
        </div>
        <div>
          <p className="products_header_title mb-5">My Products</p>
          {merchant?.products.map((product: Product) => (
            <BuildProduct
              key={product.id}
              {...product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      </div>
      {isModalOpen && selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={handleModalClose}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

const Products = () => {
  const content = {
    currentView: <ProductsView />,
    activeId: 9
  };
  return (
    <Window currentView={content.currentView} activeId={content.activeId} />
  );
};

export default Products;
