import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./styles/signup.css";
import merchHero from "./assets/2.png"
import iBillsLogo from "./assets/amaps.png"
import ojapay from "../shared/assets/images/ojapay.png"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authState, setPacketStatus, setFirstName, setLastName, setPhoneNumber, setPassword, setConfirmPassword, setEmail, setCountry, setCurrency } from '../shared/assets/slices/authSlice';
import HandleSubmit from "./components/HandleSubmit";
import { env } from "../shared/assets/environment/envSelector";
import iziToast from "izitoast";
import LanguageSwitcherMerchant from '../LanguageSwitcherMerchant';
import Spinner from '../shared/assets/spinner/spinner';


type Props = {}

interface CurrencyInfo {
  name: string;
  symbol: string;
}

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  currencies: {
    [key: string]: CurrencyInfo;
  };
}


const SignUp = (props: Props) => {
  const { t } = useTranslation('merchant_signup');
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const { message, firstName, lastName, phoneNo, password, confirmPassword, email, country, currency } = useSelector((state: { auth: authState }) => state.auth);

  const { signup } = env;

  const navigate = useNavigate()


  const payload = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNo,
    currency: currency,
    country: country,
    password: password,
    confirm_password: confirmPassword,
    user_type: "Merchant"
  };

  console.log("payload: ", payload)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');

      // Sort countries alphabetically by their common name
      const sortedCountries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(sortedCountries);

      // Set Nigeria as the default selected country
      const nigeria = sortedCountries.find(country => country.name.common === "Nigeria");
      if (nigeria) {
        setSelectedCountry(nigeria);
      }
    }
    fetchCountries();
  }, []);

  // Handle country selection
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find(c => c.name.common === countryName);

    if (country) {
      setSelectedCountry(country);
      dispatch(setCountry(countryName));

      // Set the currency based on the selected country
      const currencyKey = Object.keys(country.currencies)[0];
      dispatch(setCurrency(currencyKey));
    } else {
      setSelectedCountry(null);
      dispatch(setCurrency(''));
    }
  };



  useEffect(() => {
    if (countries) {
      console.log("countries: ", countries)
    }
  }, [countries])

  useEffect(() => {
    if (selectedCountry) {
      console.log("selected flag: ", selectedCountry)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (statusMessage) {
      console.log("statusMessage: ", statusMessage)
    }
  })


  const createAccount = async (e: any) => {
    e.preventDefault();
    const headers = {
      headers: { "Content-type": "application/json" },
    }
    setIsLoading(true);
    try {
      const success = await HandleSubmit(e, payload, signup, "POST", setPacketStatus, setStatusMessage, undefined, undefined, headers);
      if (success) {
        iziToast.success({
          title: 'Success',
          message: statusMessage,
        });
        navigate("/merchant/verifyotp")
      } else {
        iziToast.error({
          title: 'Error',
          message: statusMessage || "Something went wrong, please try again later",
        });
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: "Something went wrong, please try again later",
      });
    } finally {
      setIsLoading(false);
    }

  };


  return (
    <main className='signup'>
      <Spinner isLoading={isLoading} />
      <div className="column1">
        <div className="wrapper1">
          <div className="d-flex flex-row justify-content-between">
            <img src={ojapay} className='amapgs_logo rounded-pill' alt="instant bills pay logo" onClick={() => navigate("/merchant")} />
            <LanguageSwitcherMerchant />
          </div>
          <form className='signup_form' method="POST">
            <div className="part1">
              <h2 className='title'>{t('merchant_account')}</h2>
              <div className='create_account_data'>
                <section className="name_field">
                  <label className='firstname_l'>{t('first_name')}
                    <input className='firstname signup-input set_input' type="text" onChange={(e) => dispatch(setFirstName(e.target.value))} />
                  </label>
                  <label className='lastname_l'>{t('last_name')}
                    <input className='lastname signup-input set_input' type="text" onChange={(e) => dispatch(setLastName(e.target.value))} />
                  </label>
                </section>
                <div className="input-group mb-3">
                  <select className="form-select set_input2" onChange={handleCountryChange} defaultValue="Nigeria">
                    <option value="Nigeria" selected>Nigeria</option>
                    {countries && countries.map((country) => (<option key={country.name.common} value={country.name.common}>{country.name.common}</option>))}
                  </select>
                </div>
                {/* Telephone Input Group */}
                <label className='phone_l'>{t('phone_number')}
                  <div className="input-group mb-3">
                    {selectedCountry && (
                      <span className="input-group-text set_input3">
                        <img
                          src={selectedCountry.flags.png}
                          alt={selectedCountry.name.common}
                          style={{ width: '45px', height: '25px' }}
                        />
                      </span>
                    )}
                    {selectedCountry ? (
                      <input
                        className="form-control set_input"
                        type="tel"
                        onChange={(e) => dispatch(setPhoneNumber(`${selectedCountry.idd.root}${selectedCountry.idd.suffixes.length === 1 ? selectedCountry.idd.suffixes : ''}${e.target.value}`))}
                      />
                    ) : (<input
                      className="form-control set_input"
                      type="tel"
                      onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                    />)}

                  </div>
                </label>
                {/* </section> */}
                <label className='email_l'>{t('email')}
                  <input className='email signup-input set_input' placeholder={t('email')} type="email" onChange={(e) => dispatch(setEmail(e.target.value))} />
                </label>
                <label className='password_l'>{t('password')}
                  <input className='password signup-input set_input' placeholder={t('password')} type="password" onChange={(e) => dispatch(setPassword(e.target.value))} />
                </label>
                <label className='password_l'>{t('confirm_password')}
                  <input className='confirm_password signup-input set_input' placeholder={t('confirm_password')} type="password" onChange={(e) => dispatch(setConfirmPassword(e.target.value))} />
                </label>
              </div>
              <p className="warning">{message ? message : null}</p>
              <p className="signup-subtext"><input type="checkbox" id="terms" onChange={(e) => setIsTermsChecked(e.target.checked)} /> <span className="text-muted ts-12">I agree to the <a href="/terms-and-conditions">Terms and Conditions</a></span></p>
              <button className="button1"
                onClick={createAccount} disabled={!isTermsChecked}>{t('create_account')}
              </button>
              <h2 className="create_account_title">{t('already_have_account')}</h2>
              <button className="button2" onClick={() => navigate("/merchant/signin")}>{t('sign_in')}</button>
            </div>
          </form>
        </div>
      </div>
      <div className='column2'>
        <img src={merchHero} alt="hero_img" className="hero_img_signup" loading="lazy" />
      </div>

    </main>
  );
}

export default SignUp;
