import React, { ChangeEvent, useEffect, useState } from 'react';
import ImgPlaceHolder from "./assets/imagePlaceholder.png";
import ojapay from "../shared/assets/images/ojapay.png";
import "./styles/businessVerification.css";
import { FaCircleCheck, FaUpload } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { env } from '../shared/assets/environment/envSelector';
import HandleSubmit from './components/HandleSubmit';
import { authState } from '../shared/assets/slices/authSlice';
import { useSelector } from 'react-redux';
import SuccessModal from './builders/SuccessModal';
import WarningModal from './builders/SuccessModal';
import Spinner from '../shared/assets/spinner/spinner';
import iziToast from 'izitoast';


type Props = {};

const renderInputField = (label: string, name: string, type: string, placeholder: string, handleChange: Function, value: string) => (
    <>
        <p className='content_title'>{label}</p>
        <input
            className="content1_input"
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            value={value}
        />
    </>
);


const renderFileUpload = (label: string, name: string, handleChange: Function, fileName: string) => (
    <>
        <label htmlFor={name} className='bus_ver_upload_btn'><FaUpload /> {label}</label>
        <input type="file" name={name} id={name} hidden onChange={(e) => handleChange(e)} />
        <span className='bus_ver_img_span_tag'>{fileName}</span>
    </>
);

const BusinessVerification = (props: Props) => {
    const payload = {
        profile_picture: null,
        business_name: "",
        business_certificate: null,
        rc_number: "",
        rc_certificate: null,
        tax_id: "",
        tax_certificate: null,
        id_type: "",
        upload_id: null,
        bvn: "",
        enter_bvn_number: "",
        bank_name: "",
        account_number: "",
        email: "",
    };

    const { busVerification, idChoices } = env;
    const [activeTab, setActiveTab] = useState<number>(1);
    const [idtypes, setIdTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [completed, setCompleted] = useState({ tab1: false, tab2: false, tab3: false });
    const [businessType, setBusinessType] = useState("");
    const [idName, setIdName] = useState('');
    const [packetStatus, setPacketStatus] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [imageData, setImageData] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imagenames, setImageNames] = useState<any>(payload);
    const [formData, setFormData] = useState<any>(payload);
    const getAllUser = useSelector((state: { auth: authState }) => state.auth);
    const { getUser } = getAllUser;
    const { user = '' } = getUser || {};
    const { email = '' } = user || {};
    const navigate = useNavigate();


    const handleNext = (e: any) => {
        e.preventDefault();

        if (activeTab === 1 && businessType !== "") {
            // Proceed from tab 1 to tab 2
            handleBusVerificationUpload(e);
            setCompleted({ ...completed, tab1: true });
            setActiveTab(2);
        } else if (activeTab === 2) {
            // Validation for business details
            if (formData.profile_picture && formData.business_type && formData.business_name && formData.rc_number && formData.business_certificate && formData.rc_certificate && formData.tax_id && formData.tax_certificate) {
                handleBusVerificationUpload(e);
                setCompleted({ ...completed, tab2: true });
                setActiveTab(3);
            } else {
                setMessage("Please fill in all business details before proceeding.");
                setShowWarningModal(true);
            }
        } else if (activeTab === 3) {
            // Validation for KYC details
            if (formData.bvn && formData.id_type) {
                handleBusVerificationUpload(e);
                setCompleted({ ...completed, tab3: true });
                navigate("/merchant/dashboard")
            } else {
                setMessage("Please complete KYC details before submitting.");
                setShowWarningModal(true);
            }
        }
    };



    const handleBusVerificationUpload = async (e: any) => {
        e.preventDefault();
        const headers = { headers: { "Content-type": "multipart/formdata" } };
        const formdata = new FormData();

        Object.keys(formData).forEach(key => {
            if (formData[key] instanceof File) {
                formdata.append(key, formData[key], formData[key].name);
            } else {
                formdata.append(key, formData[key] ?? "");
            }
        });

        setIsLoading(true);
        try {
            const success = await HandleSubmit(e, formdata, busVerification, "PUT", setPacketStatus, setStatusMessage, undefined, undefined, headers);
            if (success) {
                setMessage("Your record has been updated successfully!");
                iziToast.success({
                    title: "Success",
                    message: message
                })
            } else {
                setMessage("Your record could not be updated!");
                iziToast.error({
                    title: "Error",
                    message: message
                })
            }

        } catch (error) {
            iziToast.error({
                title: "Error",
                message: "Something went wrong, please try again later."
            })
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const { name, files } = e.target;
            setFormData((prevData: any) => ({ ...prevData, [name]: files[0] }));
            if (name === "profile_picture") {
                setImageData(files[0]);
            }
            setImageNames((prevData: any) => ({ ...prevData, [name]: files[0].name }));
        } else {
            const { name, value } = e.target;
            setFormData((prevData: any) => ({ ...prevData, [name]: value }));
        }
    };


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "id_type") {
            setIdName(value);
            setFormData((prevData: any) => ({ ...prevData, [name]: value }));
        } else if (name === "business_type") {
            setBusinessType(value);
            setFormData((prevData: any) => ({ ...prevData, [name]: value }));
        }
    };


    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowWarningModal(false);
    };

    useEffect(() => {
        if (formData) {
            formData.email = email;
            formData.id_type = idName;
            formData.business_type = businessType;
        }
    }, [formData]);

    useEffect(() => {
        if (imageData) {
            const url = URL.createObjectURL(imageData);
            setImageUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [imageData]);

    useEffect(() => {
        fetch(idChoices)
            .then((response) => response.json())
            .then((data) => {
                setIdTypes(data.idtypes);
            });
    }, []);

    const StepProgressBar = ({ activeTab, totalSteps }: any) => (
        <div className="step-progress-bar">
            {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="step-progress">
                    <div className={`step-marker ${i < activeTab ? "active" : ""}`}>{i + 1}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='bus_ver_super_contaner'>
            <Spinner isLoading={isLoading} />
            <div className='bus_ver_header'>
                <img src={ojapay} alt='ibils logo' style={{ width: '120px', height: '50px', marginBottom: '30px' }} onClick={() => navigate('/merchant/dashboard')} />
                <div className='bus_ver_hd_wrapper'>
                    <div>
                        <h2 className='bus_ver_hd_title'>Business Verification</h2>
                        <p className='bus_ver_hd_txt'>Upgrade for more. Verify your business, unlock advanced features.</p>
                    </div>
                    <button className='bus_ver_visit_branch_btn' onClick={() => navigate("/merchant/physical-verification")}>Visit any UBA branch for physical verification</button>
                </div>
            </div>

            <StepProgressBar activeTab={activeTab} totalSteps={3} />

            <div className='bus_ver_main'>
                <ul className='bus_ver_aside_tab'>
                    <li className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
                        Select Business Type <FaCircleCheck className="profile_check_icon" size={15} color={completed.tab1 ? "#6FCF97" : "grey"} />
                    </li>
                    {businessType !== "Individual" && (
                        <li className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
                            Business Details <FaCircleCheck className="profile_check_icon" size={15} color={completed.tab2 ? "#6FCF97" : "grey"} />
                        </li>
                    )}
                    <li className={activeTab === 3 ? "active" : ""} onClick={() => setActiveTab(3)}>
                        KYC <FaCircleCheck className="profile_check_icon" size={15} color={completed.tab3 ? "#6FCF97" : "grey"} />
                    </li>
                </ul>
                <div className='bus_ver_content_container'>
                    {activeTab === 1 && (
                        <div className='bus_ver_content'>
                            <p className='bus_ver_sec_title'>Select Business Type</p>
                            <div className='content_upload_frm'>
                                <select name="business_type" id="business_type" className='content_input_select' value={businessType} onChange={handleSelectChange}>
                                    <option value="">-- Select Business Type --</option>
                                    <option value="NGO">NGO</option>
                                    <option value="Company">Company</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>
                            <button className='bus_ver_action_button' onClick={handleNext} disabled={!formData.business_type}>
                                Next
                            </button>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div className='bus_ver_content'>
                            <p className='bus_ver_sec_title'>Business Details</p>
                            <div className='bus_ver_img_sec'>
                                <img src={imageUrl ? imageUrl : ImgPlaceHolder} alt="placeholder" className="bus_ver_img_logo" />
                                <p className='bus_ver_img_txt'>Max 500px by 500px</p>
                                {renderFileUpload("Upload Logo", "profile_picture", handleImageChange, imagenames.profile_picture)}
                            </div>
                            <div className='content_upload_frm'>
                                {renderInputField("Business Name", "business_name", "text", "Enter your business name", handleImageChange, formData.business_name)}
                                {renderFileUpload("Upload Business Name Certificate", "business_certificate", handleImageChange, imagenames.business_certificate)}
                                {renderInputField("RC Number", "rc_number", "text", "Enter your RC Number", handleImageChange, formData.rc_number)}
                                {renderFileUpload("Upload RC Certificate", "rc_certificate", handleImageChange, imagenames.rc_certificate)}

                                {renderInputField("Tax ID", "tax_id", "text", "Enter your Tax ID", handleImageChange, formData.tax_id)}
                                {renderFileUpload("Upload Tax ID Certificate", "tax_certificate", handleImageChange, imagenames.tax_certificate)}
                                <button className='bus_ver_action_button' onClick={handleNext} disabled={!formData.profile_picture || !formData.business_name || !formData.business_certificate || !formData.rc_number || !formData.rc_certificate || !formData.tax_id || !formData.tax_certificate}>
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 3 && (
                        <div className='bus_ver_content'>
                            <p className='bus_ver_sec_title'>Know Your Customer (KYC)</p>
                            <div className='content_upload_frm'>
                                <p className='content_title'>Choose ID Type</p>
                                <select name="id_type" id="id_type" className='content_input_select' value={idName} onChange={handleSelectChange}>
                                    <option value="">-- Select ID Type --</option>
                                    {idtypes.map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {renderFileUpload("Upload ID", "upload_id", handleImageChange, imagenames.upload_id)}
                                {renderInputField("BVN", "bvn", "text", "Enter your BVN", handleImageChange, formData.bvn)}
                                <button className='bus_ver_action_button' onClick={handleNext} disabled={!formData.bvn || !formData.id_type}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {showSuccessModal && <SuccessModal msg={message} onClose={handleCloseModal} />}
            {showWarningModal && <WarningModal msg={message} onClose={handleCloseModal} />}
        </div>
    );
};

export default BusinessVerification;
