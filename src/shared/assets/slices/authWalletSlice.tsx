import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { env } from '../environment/envSelector'

// Base URL for the Django backend
const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

// Define types for the state
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  data: any;
}

interface SignupFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  user_type: string;
  country: string;
  currency: string;
};

interface Wallet {
  id: number;
  name: string;
  currency: string;
  balance: string;
  user: string;
  created_on: string;
  modified_on: string;
}

interface WalletData {
  status: string;
  response: string;
  data: Wallet[];
}

interface WalletState {
  status: string;
  response: string | null;
  data: WalletData | null;
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: string;  // "credit" or "debit"
  description: string;
  status: string;
}

export interface AuthWalletState {
  user: User | null;
  wallets: WalletState;
  recentTransactions: Transaction[];
  signupFormInputs: SignupFormInputs | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthWalletState = {
  user: null,
  wallets: {
    status: 'idle',
    response: '',
    data: {
      status: '',
      response: '',
      data: []
    },
  },
  recentTransactions: [],
  signupFormInputs: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};


// Async actions for authentication
export const signup = createAsyncThunk('auth/signup', async (data: SignupFormInputs) => {
  const response = await fetch(`${BASE_URL}auth/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const user = await response.json();
  return { user, formInputs: data };
});

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
});

export const logout = createAsyncThunk('auth/logout', async (token: string) => {
  const response = await fetch(`http://127.0.0.1:8000/userservice/logout/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
});

export const setTransferPin = createAsyncThunk('auth/setTransferPin', async ({ token, credentials }: { token: string; credentials: { wallet_pin: string } }) => {
  const response = await fetch(`${BASE_URL}user/set-pin/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(credentials),
  });
  return response.json();
});

export const updateWalletPin = createAsyncThunk('auth/updateWalletPin', async ({ token, credentials }: { token: string; credentials: { wallet_pin: string } }) => {
  const response = await fetch(`${BASE_URL}user/update-pin/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(credentials),
  });
  return response.json();
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (credentials: { otp: string, email: string, currency: string }) => {
  const response = await fetch(`${BASE_URL}auth/verify-otp/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
});

export const updatePassword = createAsyncThunk('auth/updatePassword', async ({ token, credentials }: { token: string; credentials: { password: string } }) => {
  const response = await fetch(`${BASE_URL}user/update-password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(credentials),
  });
  return response.json();
});

export const viewProfile = createAsyncThunk('auth/viewProfile', async (token: string) => {
  const response = await fetch(`${BASE_URL}user`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
});

export const requestPasswordOtp = createAsyncThunk('auth/requestPasswordOtp', async (token: string) => {
  const response = await fetch(`${BASE_URL}user/request-password-otp/`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
});

// Async actions for wallet management
export const walletList = createAsyncThunk('wallet/walletList', async (token: string) => {
  const response = await fetch(`${BASE_URL}user/wallets/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const resp = await response.json()
  return resp;
});

export const createWallet = createAsyncThunk('wallet/createWallet', async ({ token, walletData }: { token: string; walletData: { name: string; currency: string; balance: string; user: string; created_on: string; } }) => {
  const response = await fetch(`${BASE_URL}user/wallets/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
  return response.json();
});

export const fundWalletVerify = createAsyncThunk('wallet/fundWalletVerify', async ({ token, walletData }: { token: string; walletData: { currency: string, amount: number, return_url: string, link: string, otp: string } }) => {
  const response = await fetch(`${BASE_URL}user/wallet/fund/validation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
  const data = await response.json();
  return data;
});

export const fundWallet = createAsyncThunk('wallet/fundWallet', async ({ token, walletData }: { token: string; walletData: { currency: string, amount: number, return_url: string, link: string } }) => {
  const response = await fetch(`${BASE_URL}user/wallet/fund/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
  const data = await response.json();
  return data;
});

export const verifyDeposit = createAsyncThunk('wallet/verifyDeposit', async ({ token, refNo, currency }: { token: string; refNo: string; currency: string }) => {
  const response = await fetch(`${BASE_URL}user/wallet/verify-deposit/${refNo}/${currency}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
});

export const walletToWalletTransfer = createAsyncThunk('wallet/walletToWalletTransfer', async ({ token, walletData }: { token: string; walletData: { ojapay_tag: string; amount: number; note: string; wallet_pin: string, recipient_amount?: number, donor_currency?: string, recipient_currency?: string } }) => {
  console.log("token from slice: ", token)
  console.log("walletData from slice: ", walletData)
  const response = await fetch(`${BASE_URL}user/wallet/transfer/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
  return response.json();
});

export const walletToWalletValidation = createAsyncThunk('wallet/walletToWalletValidation', async ({ token, walletData }: { token: string; walletData: { ojapay_tag: string; amount: number; note: string; wallet_pin: string, recipient_amount?: number, donor_currency?: string, recipient_currency?: string, otp: string } }) => {
  console.log("token from slice: ", token)
  console.log("walletData from slice: ", walletData)
  const response = await fetch(`${BASE_URL}user/wallet/transfer/validation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
  return response.json();
});

export const sendDonationDetails = createAsyncThunk(
  'donation/sendDonationDetails', async ({ token, donationData }: { token: string; donationData: { donor_id: number; recipient_id: number; amount: number; currency: string, description: string } }) => {
    const response = await fetch(`${env.makeDonations}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      throw new Error('Failed to save donation details.');
    }

    return response.json();
  }
);

const authWalletSlice = createSlice({
  name: 'authWallet',
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    setSignupFormInputs: (state, action: PayloadAction<SignupFormInputs>) => {
      state.signupFormInputs = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      console.log('Dispatched setUser with payload:', action.payload);
      return { ...state, ...action.payload };
      // state.user = action.payload;
    },
    setWallet(state, action: PayloadAction<WalletState>) {
      console.log('Dispatched setWallet with payload:', action.payload);
      return { ...state, ...action.payload };
      // state.wallets = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ user: User, formInputs: SignupFormInputs }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.signupFormInputs = action.payload.formInputs;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to signup';
      })
      // Add cases for other async actions
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logout.pending, (state) => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(viewProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(viewProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(walletList.pending, (state) => {
        state.loading = true;
      })
      .addCase(walletList.fulfilled, (state, action: PayloadAction<WalletData>) => {
        state.loading = false;
        state.wallets.data = action.payload;
      })
      .addCase(walletList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch wallets';
      })
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWallet.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create wallet';
      })
      .addCase(setTransferPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(setTransferPin.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(setTransferPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to set transfer pin';
      })
      .addCase(updateWalletPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWalletPin.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(updateWalletPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update wallet pin';
      })
      .addCase(fundWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fundWallet.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.wallets = action.payload;
      })
      .addCase(fundWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fund wallet';
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to verify otp';
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update password';
      })
      .addCase(requestPasswordOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPasswordOtp.fulfilled, (state, action: PayloadAction<WalletState>) => {
        state.loading = false;
        state.wallets = action.payload;;
      })
      .addCase(requestPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request password otp';
      })
      .addCase(verifyDeposit.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyDeposit.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedWallet = action.payload;
        if (state.wallets?.data?.data) {
          state.wallets.data.data = state.wallets.data.data.map((wallet: Wallet) =>
            wallet.id === updatedWallet.id ? updatedWallet : wallet
          );
        }
      })
      .addCase(verifyDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to verify deposit';
      })
      .addCase(walletToWalletTransfer.pending, (state) => {
        state.loading = true;
      })
      .addCase(walletToWalletTransfer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedWallet = action.payload;
        if (state.wallets?.data?.data) {
          state.wallets.data.data = state.wallets.data.data.map((wallet: Wallet) =>
            wallet.id === updatedWallet.id ? updatedWallet : wallet
          );
        }
      })
      .addCase(walletToWalletTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to transfer wallet to wallet';
      })
      .addCase(sendDonationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendDonationDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedWallet = action.payload;
        if (state.wallets?.data?.data) {
          state.wallets.data.data = state.wallets.data.data.map((wallet: Wallet) =>
            wallet.id === updatedWallet.id ? updatedWallet : wallet
          );
        }
      })
      .addCase(sendDonationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send donation details';
      });
  },
});

export const { resetAuthState, setSignupFormInputs, setUser, setWallet } = authWalletSlice.actions;

export default authWalletSlice.reducer;
