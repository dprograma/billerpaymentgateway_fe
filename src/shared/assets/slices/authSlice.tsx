// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';


// Define the type for your slice state
export interface authState {
    displayPart1: boolean,
    displayPart2: boolean,
    getCode1: boolean,
    getCode2: boolean,
    resendCode1: boolean,
    resendCode2: boolean,
    packetStatus: boolean,
    message: string,
    firstName: string,
    lastName: string,
    phoneNo: string,
    currency: string,
    password: string,
    confirmPassword: string,
    email: string,
    emailOtp: string,
    phoneOtp: string,
    country: string,
    isAuthenticated: boolean,
    getUser: any,
    getWallet: any,
}

const initialState: authState = {
    displayPart1: true,
    displayPart2: false,
    getCode1: true,
    getCode2: true,
    resendCode1: false,
    resendCode2: false,
    packetStatus: false,
    message: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    currency: '',
    country: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailOtp: '',
    phoneOtp: '',
    isAuthenticated: false,
    getUser: null,
    getWallet: null,
  };

export const authSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setDisplayPart1: (state, action) => {
            state.displayPart1 = action.payload;
        },
        setDisplayPart2: (state, action) => {
            state.displayPart2 = action.payload;
        },
        setGetCode1: (state, action) => {
            state.getCode1 = action.payload;
        },
        setGetCode2: (state, action) => {
            state.getCode2 = action.payload;
        },
        setResendCode1: (state, action) => {
            state.resendCode1 = action.payload;
        },
        setResendCode2: (state, action) => {
            state.resendCode2 = action.payload;
        },
        setPacketStatus: (state, action) => {
            state.packetStatus = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNo = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setEmailOtp: (state, action) => {
            state.emailOtp = action.payload;
        },
        setPhoneOtp: (state, action) => {
            state.phoneOtp = action.payload;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setGetUser: (state, action) => {
            state.getUser = action.payload
        },
        setGetWallet: (state, action) => {
            return { ...state.getUser, ...action.payload }
        },
        setGetProduct: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetAuthState: () => initialState,
    },
});

export const { setDisplayPart1, setDisplayPart2, setGetCode1, setGetCode2, setResendCode1, setResendCode2, setPacketStatus, setMessage, setFirstName, setLastName, setPhoneNumber, setCountry, setPassword, setEmail, setEmailOtp, setPhoneOtp, setIsAuthenticated, resetAuthState, setGetUser, setConfirmPassword, setGetWallet, setGetProduct, setCurrency } = authSlice.actions;

export default authSlice.reducer;
