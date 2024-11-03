const debug: string = "TRUE"

const dev = "http://127.0.0.1:3000/"
const live = "https://amapsdemo.ojapay.com/"

const userDevUrl = "http://127.0.0.1:8000/api/v1/"
const userserviceDevUrl = "http://127.0.0.1:8000/userservice/"
const transactionDevUrl = "http://127.0.0.1:8000/transaction/"
const merchantDevUrl = "http://127.0.0.1:8000/merchantservice/"
const paymentGatewayDevUrl = "http://127.0.0.1:8000/paymentgatewayservice/"
const walletDevUrl = "http://127.0.0.1:8000/walletservice/"

const userProdUrl = "https://amaps.ojapay.com/api/v1/"
const userserviceProdUrl = "http://amaps.ojapay.com/userservice/"
const transactionProdUrl = "https://amaps.ojapay.com/api/v1/transaction/"
const merchantProdUrl = "https://amaps.ojapay.com/merchantservice/"
const paymentGatewayProdUrl = "https://amaps.ojapay.com/paymentgatewayservice/"
const walletProdUrl = "https://amaps.ojapay.com/walletservice/"



const userBaseUrl = debug === "TRUE" ? userDevUrl : userProdUrl
const userserviceBaseUrl = debug === "TRUE" ? userserviceDevUrl : userserviceProdUrl
const transactionBaseUrl = debug === "TRUE" ? transactionDevUrl : transactionProdUrl
const merchantBaseUrl = debug === "TRUE" ? merchantDevUrl: merchantProdUrl
const paymentGatewayBaseUrl = debug === "TRUE" ? paymentGatewayDevUrl: paymentGatewayProdUrl
const walletBaseUrl = debug === "TRUE" ? walletDevUrl: walletProdUrl
export const url = debug === "TRUE" ? dev : live

export const env = {
    login: userBaseUrl + "auth/login/",
    signup: userBaseUrl + "auth/signup/",
    logout: merchantBaseUrl + "logout/",
    getEmailOtp: merchantBaseUrl + "otp-email/",
    getPhoneOtp: merchantBaseUrl + "otp-phone-number/",
    verifyOtp: merchantBaseUrl + "email-phone-verification/",
    busVerification: merchantBaseUrl + "business-verification/",
    idChoices: merchantBaseUrl + "id-choices/",
    bankChoices: merchantBaseUrl + "bank-choices/",
    createProduct: merchantBaseUrl + "products/",
    getAllProducts: merchantBaseUrl + "all-products/",
    productCategories: merchantBaseUrl + "categories/",
    walletList: userBaseUrl + "user/wallets/",
    getBankList: paymentGatewayBaseUrl + "get-bank-list/",
    walletToBankTransfer: userBaseUrl + "user/wallet/bank-transfer/",
    walletToBankOTPValidation: userBaseUrl + "user/wallet/bank-otp-validation/",
    setWalletPin: userBaseUrl + "user/set-pin/",
    deleteUpdateProduct: merchantBaseUrl + "products/",
    merchantTransactions: transactionBaseUrl + "transactions/",
    AllMerchantTransactions: transactionBaseUrl + "all-transactions/",
    merchantCountries: merchantBaseUrl + "merchant-countries/",
    getCurrencyList: walletBaseUrl + "currency-list/",
    getExchangeRate: walletBaseUrl + "exchange-rate/",
    makeWalletUpdate: walletBaseUrl + "wallet-update/",
    getCurrentUser: userBaseUrl + "user/getuser/",
    getRecipients: userserviceBaseUrl + "recipients/", 
    makeDonations: userserviceBaseUrl + "donations/", 
}                                                                                