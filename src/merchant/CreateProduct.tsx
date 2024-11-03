import React, { useEffect, useState } from 'react';
import { FaCircleLeft } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';
import Window from "./Window";
import { useSelector } from 'react-redux';
import { authState } from '../shared/assets/slices/authSlice';
import HandleSubmit from './components/HandleSubmit';
import SuccessModal from './builders/SuccessModal';
import WarningModal from './builders/SuccessModal';
import { setPacketStatus, setGetProduct } from '../shared/assets/slices/authSlice';
import { env } from "../shared/assets/environment/envSelector";
import axios from 'axios';
import Spinner from '../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


type Props = {}

const CreateProductView = (props: Props) => {
    const { getUser } = useSelector((state: { auth: authState }) => state.auth);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    var [message, setMessage] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [prod_user, setUser] = useState<any>(null);
    const { access_token = '', user = '', wallet } = getUser || {};
    console.log("user: ", user)
    const { first_name = '', last_name = '', business_name = '' } = user || {};
    const { createProduct, productCategories } = env;

    const payload = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category_id: productCategory,
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowWarningModal(false);
    };

    if (statusMessage) {
        message = statusMessage
        console.log("status message: ", statusMessage)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            };
            try {
                const response = await axios.get(productCategories, headers);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const headers = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        };
        setIsLoading(true);
        try {
            const success = await HandleSubmit(e, payload, createProduct, "POST", setPacketStatus, setStatusMessage, setUser, access_token, headers);
            if (success) {
                iziToast.success({
                    title: "Success",
                    message: message
                })
            } else {
                iziToast.error({
                    title: "Error",
                    message: message
                })
            }

        } catch (error) {
            iziToast.error({
                title: "Error",
                message: "Something went wrong. Please try again later."
            })
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="container mt-4">
            <Spinner isLoading={isLoading} />
            <div className="d-flex align-items-center mb-3">
                <FaCircleLeft size={30} color="#B20C02" />
                <h2 className="ms-3">{business_name}</h2>
            </div>
            <hr />
            <div className="row justify-content-center">
                <div className="card p-4 w-50">
                    <h3>Create Product</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Name of Product</label>
                            <input type="text" className="form-control" id="productName" name="name" placeholder="Name of product" onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Product Description</label>
                            <textarea className="form-control" id="productDescription" name="description" placeholder="Product description" onChange={(e) => setProductDescription(e.target.value)}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="productPrice" className="form-label">Price</label>
                                <input type="text" className="form-control" id="productPrice" name="price" placeholder="Price" onChange={(e) => setProductPrice(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="productCategory" className="form-label">Product Category</label>
                                <select className="form-control" id="productCategory" name="category" onChange={(e) => setProductCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#B20C02', color: '#fff' }} onClick={handleCreateProduct}>Submit</button>
                    </form>
                </div>

            </div>
            {showSuccessModal && <SuccessModal msg={message} onClose={handleCloseModal} />}
            {showWarningModal && <WarningModal msg={message} onClose={handleCloseModal} />}
        </div>
    );
};

const CreateProduct = () => {
    const content = {
        currentView: <CreateProductView />,
        activeId: 10
    };
    return (
        <Window currentView={content.currentView} activeId={content.activeId} />
    );
};

export default CreateProduct;
