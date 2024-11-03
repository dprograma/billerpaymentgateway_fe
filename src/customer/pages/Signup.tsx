import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { signup, setSignupFormInputs } from '../../shared/assets/slices/authWalletSlice';
import ojapay from '../../shared/assets/images/ojapay.png';
import { NavLink } from 'react-router-dom';
import '../assets/css/Signup.css';
import signupImg from '../../shared/assets/images/signin.png';
import iziToast from 'izitoast';
import LanguageSwitcher from '../../LanguageSwitcher';
import Spinner from '../../shared/assets/spinner/spinner';

type Props = {};

type SignupFormInputs = {
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


interface SignupResponse {
  user: {
    status: string;
    response: string;
  };
  formInput: {};
}

const Signup = (props: Props) => {
  const { t } = useTranslation('customer_signup');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const signupFormInputs = useSelector((state: RootState) => state.authWallet.signupFormInputs);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormInputs>();

  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: 'https://flagcdn.com/w320/ng.png', 
    dialCode: '+234',
    country: 'Nigeria',
    currency: 'NGN'
  });

  // Fetch countries and set default values
  useEffect(() => {
    if (signupFormInputs) {
      Object.keys(signupFormInputs).forEach(key => {
        register(key as keyof SignupFormInputs, { value: signupFormInputs[key as keyof SignupFormInputs] });
      });
    }

    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);

        // Automatically set the Nigerian flag and dial code if present in the fetched data
        const nigeria = sortedCountries.find((country: { cca2: string; }) => country.cca2 === 'NG');
        if (nigeria) {
          const dialCode = `${nigeria.idd.root}${nigeria.idd.suffixes ? nigeria.idd.suffixes.join('') : ''}`;
          setSelectedCountry({
            flag: nigeria.flags.png,
            dialCode: dialCode,
            country: nigeria.name.common,
            currency: Object.keys(nigeria.currencies)[0],
          });
        }
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, [signupFormInputs, register]);

  // Watch all form fields
  const formValues = watch();

  useEffect(() => {
    if (formValues) {
      console.log("formValues: ", formValues);
    }
  }, [formValues]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(country => country.name.common === e.target.value);
    if (selected) {
      const dialCode = `${selected.idd.root}${selected.idd.suffixes.length === 1 ? selected.idd.suffixes : ''}`;
      const currency = Object.keys(selected.currencies)[0];

      setSelectedCountry({
        flag: selected.flags.png,
        dialCode: dialCode,
        country: selected.name.common,
        currency: currency,
      });
    }
  };

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    data.phone_number = selectedCountry.dialCode + data.phone_number;
    data.country = selectedCountry.country;
    data.currency = selectedCountry.currency;
    console.log("payload: ", data)
    setIsLoading(true);
    try {
      const response = await dispatch(signup(data));
      console.log("signup data: ", data)
      const { user } = await response?.payload as SignupResponse;
      console.log("signup user: ", user);

      if (user.status === 'success') {
        iziToast.success({
          title: 'OK',
          message: user.response,
        });
        dispatch(setSignupFormInputs(data));
        navigate('/customer/verify-otp');
      } else {
        iziToast.error({
          title: 'Error',
          message: user.response,
        });
      }
    }
    catch (error) {
      console.error('Error signing up:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    }
    finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="container-fluid dark-customer-background d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spinner isLoading={isLoading} />
      <div className="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>
      <div className="row justify-content-center w-100">
        <div className="card mb-3 align-self-center w-75 rounded-0 p-0" style={{ overflow: 'hidden' }}>
          <div className="row g-0 h-100">
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center overflow-auto">
              <div className="w-100">
                <img src={ojapay} className="logo" onClick={() => navigate("/customer")} />
                <h4 className="mb-4">{t('get_free_account')}</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder={t('enter_firstname')}
                        {...register('first_name', { required: t('firstname_required') })}
                      />
                      {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder={t('enter_lastname')}
                        {...register('last_name', { required: t('lastname_required') })}
                      />
                      {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                    </div>

                  </div>
                  {/* <div className="mb-3">
                   
                  </div> */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder={t('enter_email')} {...register('email', {
                        required: t('email_required'),
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: t('email_error_msg')
                        }
                      })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                  {/* segmented dropdown */}
                  <div className="input-group mb-3">
                    <button type="button" className="btn btn-outline-secondary d-flex align-items-center" style={{ padding: '0 8px', height: '32px' }}>
                      <img src={selectedCountry.flag} alt="flag" style={{ width: '24px', height: '24px', objectFit: 'cover', border: '1px solid #eee' }} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false" style={{ padding: '0 8px', height: '32px' }} >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                      {countries.map((country) => {
                        const dialCode = `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes.join('') : ''}`;
                        return (
                          <li key={country.name.common}>
                            <a className="dropdown-item" href="#" onClick={() => handleCountryChange({ target: { value: country.name.common } } as React.ChangeEvent<HTMLSelectElement>)}>
                              <img src={country.flags.png} alt="flag" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                              {country.name.common} ({dialCode})
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      placeholder={t('enter_phone_number')}
                      {...register('phone_number', {
                        required: t('phone_number_required'),
                        pattern: {
                          value: /^\d{7,10}$/,
                          message: t('phone_number_error_msg')
                        }
                      })}
                    />
                  </div>
                  {errors.phone_number && <p className="text-danger">{errors.phone_number.message}</p>}
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder={t('enter_password')} {...register('password', {
                        required: t('password_required'),
                        minLength: {
                          value: 8,
                          message: t('password_error_msg')
                        }
                      })}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="confirm_password"
                      placeholder={t('confirm_password')} {...register('confirm_password', {
                        required: t('confirm_password_required'),
                        minLength: {
                          value: 8,
                          message: t('confirm_password_error_msg')
                        }
                      })}
                    />
                    {errors.confirm_password && <p className="text-danger">{errors.confirm_password.message}</p>}
                  </div>
                  <input type="hidden" id="user_type" {...register('user_type')} value='customer' />
                  <p className="signup-subtext"><input type="checkbox" id="terms" onChange={(e) => setIsTermsChecked(e.target.checked)} /> <span className="text-muted ts-12">{t('i_agree')} <a href="/terms-and-conditions">{t('terms_and_conditions')}</a></span></p>
                  <button type="submit" className="btn dark-customer-background default-white-text-color btn-block" disabled={!isTermsChecked}>{t('create_account_button')}</button>
                </form>
                <p className="mt-3 text-center">{t('have_account')} <NavLink to="/customer/login">{t('login')}</NavLink></p>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative">
              <img src={signupImg} className="img-fluid h-100 rounded-0 p-0 m-0" alt="signup" />
              <div className="overlay">
                <h2 className="signup-heading">{t('join_us')}</h2>
                <p className="signup-subtext">{t('create_your_account')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
