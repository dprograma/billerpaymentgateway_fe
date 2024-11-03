import React, { useState, useEffect } from 'react';
import { TopBillers, Utilities } from '../../constants/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/assets/stores/store';
import { useTranslation } from 'react-i18next';
import { InputGroup, Card, Row, Col, Button, Modal, Dropdown, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { env } from '../../shared/assets/environment/envSelector';
import PaymentOptionModal from './PaymentOptionModal';
import WalletSelector from './WalletSelector';
import PaymentModal from './PaymentModal';
import WalletTransferOTPModal from './WalletTransferOTPModal';
import Spinner from '../../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


interface BillerProduct {
  name: string;
  description: string;
  price: number;
  walletTag: string;
  user: {
    profile_picture: string;
    username: string;
  };
}

const BillersPagePanel = () => {
  const { t } = useTranslation('customer_paybills');
  const [showUtilityModal, setShowUtilityModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showPaymentOptionModal, setShowPaymentOptionModal] = useState(false);
  const [showWalletTransferOTPModal, setShowWalletTransferOTPModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState<BillerProduct | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('Nigeria'); // Default country set to Nigeria
  const [walletData, setWalletData] = useState<any>(null);
  const [itemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [walletSelectorShow, setWalletSelectorShow] = useState(false);
  const [africaCountries, setAfricaCountries] = useState<string[]>([]);
  const [worldCountries, setWorldCountries] = useState<string[]>([]);
  const [billerProducts, setBillerProducts] = useState<BillerProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersCountry, setUsersCountry] = useState<string>('');
  const [customBillers, setCustomBillers] = useState<BillerProduct[]>([]);
  const [restOfWorldCountries, setRestOfWorldCountries] = useState<string[]>([]);
  const [selectedAfricaCountry, setSelectedAfricaCountry] = useState<string | null>(null);
  const [selectedWorldCountry, setSelectedWorldCountry] = useState<string | null>(null);
  const userdata = useSelector((state: RootState) => state.authWallet);
  const { user } = userdata || {};
  const access_token = user?.data?.access_token || '';
  const { getAllProducts, merchantCountries } = env;



  // Fetch African and Rest of the World countries
  useEffect(() => {
    fetchCountries();
  }, [access_token, getAllProducts]);

  useEffect(() => {
    if (africaCountries.length > 0 || restOfWorldCountries.length > 0) {
      setDefaultCountries();
    }
  }, [africaCountries, restOfWorldCountries]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(merchantCountries);
      setAfricaCountries(response.data.africa || []);
      setWorldCountries(response.data.world || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Handle wallet selection
  const handleWalletSelect = (wallet: any) => {
    setSelectedWallet(wallet);
    setShowPaymentModal(true);  // Show the PaymentModal when a wallet is selected
  };

  // Function to handle opening OTP Modal
  const openWalletTransferOTPModal = (data: any) => {
    setWalletData(data);
    setShowWalletTransferOTPModal(true);
  };

  // Handle Top Biller Category Selection
  const handleCategorySelect = (category: string) => {
    if (category === 'Utilities') {
      setShowUtilityModal(true);
    } else {
      console.log("category name: ", category)
      setShowCountryModal(true); // Show country modal for any category
      setSelectedCategory(category);
    }
  };

  // Handle Utility Bill Selection Modal
  const handleUtilitySelect = (category: string) => {
    setSelectedCategory(category);
    console.log("category name: ", category)
    setShowUtilityModal(false);
    setShowCountryModal(true); // Open country selection modal
  };

  // Handle Country Selection
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
    fetchBillerProducts(selectedCategory, country); // Fetch biller products based on the selection
  };

  // Fetch biller products based on category and country
  const fetchBillerProducts = async (category: string, country: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${getAllProducts}${encodeURIComponent(category)}/${encodeURIComponent(country)}/`,
        {
          headers: { "Authorization": `Bearer ${access_token}` }
        }
      );
      setBillerProducts(response.data.data || []);
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to fetch biller products.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (selectedCountry: string | null, region: 'Africa' | 'World') => {
    if (region === 'Africa') {
      setSelectedAfricaCountry(selectedCountry);
    } else {
      setSelectedWorldCountry(selectedCountry);
    }
    if (selectedCountry) {
      fetchBillersByCountry(selectedCountry);
    }
  };

  const fetchBillersByCountry = async (country: string) => {
    try {
      const response = await axios.get(`${getAllProducts}${encodeURIComponent(country)}`, {
        headers: { "Authorization": `Bearer ${access_token}` }
      });
      setCustomBillers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching biller country:', error);
    }
  };

  const setDefaultCountries = () => {
    if (user?.data?.user) {
      const userCountry = user.data.user.country;
      console.log("user country: ", userCountry)
      setUsersCountry(userCountry)

      if (africaCountries.includes(userCountry)) {
        console.log("Is an African country")
        setSelectedAfricaCountry(userCountry);
        setSelectedWorldCountry('United States');
        fetchBillersByCountry(userCountry);
      } else if (restOfWorldCountries.includes(userCountry)) {
        console.log("Is rest of the world")
        setSelectedWorldCountry(userCountry);
        setSelectedAfricaCountry('Nigeria');
        fetchBillersByCountry(userCountry);
      } else {
        console.log("Is Nigerian")
        setSelectedAfricaCountry('Nigeria');
        setSelectedWorldCountry('United States');
        fetchBillersByCountry('Nigeria');
      }
    }
  };

  // Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Paginate billers
  const filteredBillers = billerProducts.filter(biller =>
    biller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const pagedBillers = filteredBillers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredBillers.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleProceedToPayment = (biller: BillerProduct) => {
    setSelectedBiller(biller);
    setShowPaymentOptionModal(true);
  };

  return (
    <div>
      {/* Top Billers Section */}
      <h2 className="mb-4 text-center">Top Billers</h2>
      <Spinner isLoading={isLoading} />
      <Row>
        {TopBillers.slice(0, 8).map((biller, index) => (
          <Col key={index} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow" onClick={() => handleCategorySelect(biller.name)}>
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="mb-2" style={{ fontSize: '2rem' }}>
                  <FontAwesomeIcon icon={biller.icon} className="default-text-color" />
                </div>
                <Card.Title className="text-muted">{biller.name}</Card.Title>
                <Card.Text className="fs-12">{biller.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {TopBillers.length > 8 && (
          <Button variant="primary" className="mt-4" onClick={() => {/* Show all categories */ }}>Show All</Button>
        )}
      </Row>

      {/* Utility Selection Modal */}
      <Modal show={showUtilityModal} onHide={() => setShowUtilityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Utility Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {Utilities.map((utility, index) => (
              <Col key={index} sm={6} md={4}>
                <Button variant="outline-danger" className="w-100 mb-3" onClick={() => handleUtilitySelect(utility.name)}>
                  <FontAwesomeIcon icon={utility.icon} className="me-2" />
                  {utility.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>

      {/* Country Selection Modal */}
      <Modal show={showCountryModal} onHide={() => setShowCountryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">{selectedCountry}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Africa</Dropdown.Header>
              {africaCountries.map((country, index) => (
                <Dropdown.Item key={index} onClick={() => handleCountrySelect(country)}>
                  {country}
                </Dropdown.Item>
              ))}
              <Dropdown.Header>Rest of the World</Dropdown.Header>
              {worldCountries.map((country, index) => (
                <Dropdown.Item key={index} onClick={() => handleCountrySelect(country)}>
                  {country}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
      </Modal>

      {/* Display Biller Products */}
      {billerProducts.length > 0 && (
        <div className="mt-5">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search billers"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
          <Row>
            {pagedBillers.map((biller, index) => (
              <Col key={index} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img src={biller.user.profile_picture} alt="Profile" className="rounded-circle mb-2" width="80" height="80" />
                    <Card.Title className="text-muted" style={{ fontSize: '14px' }}>{biller.name}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '12px' }}>{biller.description}</Card.Text>
                    <Button
                      variant="primary"
                      className="default-theme-color default-border-color default-white-text-color"
                      onClick={() => handleProceedToPayment(biller)}
                    >
                      {t('pay')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <ReactPaginate
            previousLabel={t('previous')}
            nextLabel={t('next')}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />

          {showPaymentOptionModal && selectedBiller && (
            <PaymentOptionModal
              show={showPaymentOptionModal}
              onHide={() => setShowPaymentOptionModal(false)}
              onProceed={(paymentOption: string) => {
                if (paymentOption === 'default') {
                  setShowPaymentOptionModal(false);
                  setShowPaymentModal(true);
                } else if (paymentOption === 'wallet') {
                  setWalletSelectorShow(true)
                }
                else {
                  iziToast.success({
                    title: 'Success',
                    message: `${paymentOption} payment option coming soon!`,
                  });
                }
              }}
              selectedCountry={usersCountry}
              africaCountries={africaCountries}
            />
          )}
          {showPaymentModal && selectedBiller && (
            <PaymentModal
              show={showPaymentModal}
              onHide={() => setShowPaymentModal(false)}
              token={access_token}
              biller={selectedBiller}
              wallet={selectedWallet}
              onPaymentSuccess={openWalletTransferOTPModal}
            />
          )}
          {walletSelectorShow &&
            <Modal
              show={walletSelectorShow}
              onHide={() => setWalletSelectorShow(false)}
              centered  // This ensures the modal appears at the center of the screen
            >
              <Modal.Header closeButton>
                <Modal.Title>Select Wallet Currency</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <WalletSelector onSelectWallet={handleWalletSelect} />
              </Modal.Body>
            </Modal>
          }
          {/* WalletTransferOTPModal */}
          {selectedWallet && (
            <WalletTransferOTPModal
              show={showWalletTransferOTPModal}
              walletData={walletData}
              closeModal={() => setShowWalletTransferOTPModal(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BillersPagePanel;
