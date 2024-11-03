// signupSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { env } from '../environment/envSelector'


// Define the type for your slice state
export interface adminState {
    password: string,
    confirmPassword: string,
    email: string,
    emailOtp: string,
    phoneOtp: string,
    country: string,
    isAuthenticated: boolean,
    getAdmin: any,
}

const initialState: adminState = {
    password: '',
    confirmPassword: '',
    email: '',
    emailOtp: '',
    phoneOtp: '',
    country: '',
    isAuthenticated: false,
    getAdmin: null,
  };


  export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${env.login}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  });

  export const AllMerchantTransactions = createAsyncThunk('auth/transactions', async () => {
    const response = await fetch(`${env.AllMerchantTransactions}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  });


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
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
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setGetAdmin: (state, action) => {
            state.getAdmin = action.payload
        },
        resetAuthState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
          // Add cases for other async actions
          .addCase(login.fulfilled, (state, action: PayloadAction<adminState>) => {
            state.getAdmin = action.payload;
            state.isAuthenticated = true;
          })
        }
});

export const { setCountry, setPassword, setEmail, setEmailOtp, setPhoneOtp, setIsAuthenticated, resetAuthState, setGetAdmin, setConfirmPassword } = adminSlice.actions;

export default adminSlice.reducer;
