import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../../shared/assets/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { walletList, setWallet } from '../../shared/assets/slices/authWalletSlice';
import axios from 'axios';
import { Table, Button, Tabs, Tab, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import DonationModal from './DonationModal'
import '../assets/css/Donations.css';
import { env } from '../../shared/assets/environment/envSelector';
import { useNavigate } from 'react-router-dom';

interface Recipient {
    id: number;
    name: string;
    country: string;
    currency: string;
    business_name: string;
    recipient_type: string;
}

const Donations: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const userdata = useSelector((state: RootState) => state.authWallet);
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    const [filteredRecipients, setFilteredRecipients] = useState<Recipient[]>([]);
    const [recipientType, setRecipientType] = useState<string>('NGO');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [balance, setBalance] = useState<number>(0)
    const [currency, setCurrency] = useState<string>('')
    const { getRecipients } = env;
    const itemsPerPage = 10;

    const [showModal, setShowModal] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
    const { user } = userdata;
    console.log("user from donations panel: ", user)
    const { access_token = '' } = user?.data || {};
    const { id, country } = user?.data?.user || {};


    // Fetch recipients from the API
    useEffect(() => {
        axios.get<Recipient[]>(getRecipients)
            .then(response => {
                console.log("reponse from donations panel: ", response.data)
                setRecipients(response.data);
                filterRecipients(response.data, recipientType);
            })
            .catch(error => {
                console.error('There was an error fetching the recipients!', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (access_token) {
                console.log("access token: ", access_token)
                const response = await dispatch(walletList(access_token));
                console.log(response)
                if (response.payload.status === 'success') {
                    console.log("response on donations: ", response.payload.data[0])
                    const { balance, currency } = response.payload.data[0]
                    setBalance(balance)
                    setCurrency(currency)
                    console.log("balance value: ", balance)
                    console.log("currency value: ", currency)
                    dispatch(setWallet(response.payload.response));
                }
            }

        }

        fetchData();
    }, [access_token, dispatch]);


    const handleDonateClick = (recipient: any) => {
        console.log("recipient: ", recipient)
        setSelectedRecipient(recipient);
        setShowModal(true);
    };

    // Filter recipients by type and search term
    const filterRecipients = (data: Recipient[], type: string) => {
        const filtered = data
            .filter(recipient => recipient.recipient_type === type)
            .filter(recipient => recipient.business_name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredRecipients(filtered);
    };

    // Handle tab change (NGO, Company, Individual)
    const handleTabSelect = (type: string | null) => {
        if (type) {
            setRecipientType(type);
            filterRecipients(recipients, type);
        }
    };

    // Handle search box input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterRecipients(recipients, recipientType);
    };

    // Handle pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecipients.slice(indexOfFirstItem, indexOfLastItem);

    const handlePaginationClick = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="donations-container">
            <h2 className="page-title">Donations</h2>

            <div className="d-flex justify-content-between mb-3">
                {/* Tabs for recipient type */}
                <Tabs activeKey={recipientType} onSelect={(type) => handleTabSelect(type)} className="mb-3">
                    <Tab eventKey="NGO" title="NGO" />
                    <Tab eventKey="Company" title="Company" />
                    <Tab eventKey="Individual" title="Individual" />
                </Tabs>

                {/* Search box */}
                <InputGroup className="search-box">
                    <FormControl
                        placeholder="Search by company name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </InputGroup>
            </div>

            {/* Data Table */}
            <Table striped bordered hover className="recipient-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Business Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map(recipient => (
                            <tr key={recipient.id}>
                                <td>{recipient.business_name} {`(${recipient.country})`} <span className="badge default-theme-color fa-pull-right" style={{ fontSize: '8px' }}>{recipient.currency}</span></td>
                                <td>{recipient.recipient_type}</td>
                                <td>
                                    <Button className="default-theme-color default-border-color" onClick={() => handleDonateClick(recipient)}>Make Donation</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">No recipients found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="pagination">
                {Array.from(Array(Math.ceil(filteredRecipients.length / itemsPerPage)).keys()).map(number => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => handlePaginationClick(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            {selectedRecipient && (
                <DonationModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    recipientId={selectedRecipient.id}
                    recipientName={selectedRecipient.business_name}
                    recipientCurrency={selectedRecipient.currency}
                    recipientCountry={selectedRecipient.country}
                    recipientWalletTag={selectedRecipient.wallet_tag}
                    donorId={id}
                    donorCurrency={currency}
                    donorCountry={country}
                    donorWalletBalance={balance}
                />
            )}
        </div>
    );
};

export default Donations;
