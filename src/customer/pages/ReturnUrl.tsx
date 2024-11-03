import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { verifyDeposit } from '../../shared/assets/slices/authWalletSlice';
import iziToast from "izitoast";


const ReturnUrl: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    console.log("trxNo: ", status, "reference: ", id);

    const userdata = useSelector((state: RootState) => state.authWallet);
    const { user } = userdata;
    const {access_token} = user?.data;
    const currency = user?.data?.wallet[0].currency;


    useEffect(() => {
        if (access_token && id) {
            dispatch(verifyDeposit({ token: access_token, refNo: id, currency: currency })).then((action) => {
                console.log("response from verify deposit: ", action)
                if (action.payload.status === "success") {
                    // Show success and redirect to fund wallet page
                    iziToast.success({
                        title: 'OK',
                        message: action.payload.response,
                    });
                    navigate("/customer/fund-wallet");
                } else {
                    // Error alert
                    iziToast.error({
                        title: 'Error',
                        message: action.payload.response,
                    });
                    navigate("/customer/fund-wallet")
                }
            });
        }
    }, [dispatch, id, navigate, access_token]);

    return <div></div>;
};

export default ReturnUrl;
