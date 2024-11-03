import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import './shared/assets/css/TermsofUse.css';

const TermsAndConditions: React.FC = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Show the button when the user scrolls down
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    // Scroll the window to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="terms-container">
            <Container className="terms-content mt-5">
                <h1 className="text-center">Terms and Conditions</h1>
                <p>
                    These Terms and Conditions ("Terms") govern the use of the <strong>Aggregated Merchant Acquiring and Payment Gateway Service (A.M.A.P.S)</strong> provided by <strong>Ojapay Nigeria Limited</strong> ("we," "our," "us"). By registering for or using the A.M.A.P.S platform, you agree to comply with these Terms. Please read them carefully before accessing or using our services.</p>

                <p>If you do not agree to these Terms, you should discontinue using the platform immediately.</p>

                <h2>1. Introduction</h2>
                <p><strong>A.M.A.P.S</strong> is a product of <strong>Ojapay Nigeria Limited</strong>, a company registered under the laws of the Federal Republic of Nigeria. A.M.A.P.S offers merchants a unified platform for acquiring customers, processing payments, and managing transactions, with the aim of simplifying payment services for businesses of all sizes.
                    This document sets out the terms governing the relationship between Ojapay Nigeria Limited and users of the A.M.A.P.S platform, including Merchants, Customers, and other users who interact with the platform.
                </p>
                <h2>2. Definitions</h2>
                <p>In these Terms, the following definitions apply:</p>
                <ul>
                    <li><strong>"Merchant"</strong> means a business or individual who wishes to accept payments through the A.M.A.P.S platform.</li>
                    <li><strong>"Customer"</strong> means a person who wishes to make a payment to a Merchant through the A.M.A.P.S platform.</li>
                    <li><strong>"User"</strong> means any person who accesses or uses the A.M.A.P.S platform, including Merchants, Customers, and other users.</li>
                    <li><strong>"Transaction"</strong> means the exchange of value between a Customer and a Merchant, including any fees, commissions, or discounts that may be charged.</li>
                    <li><strong>"Payment"</strong> means the transfer of value from a Customer to a Merchant, including any fees, commissions, or discounts that may be charged.</li>
                    <li><strong>"Payment Gateway"</strong> means the software system that connects the A.M.A.P.S platform to the payment processing system of the Merchant.</li>
                    <li><strong>"Payment Gateway Account"</strong> means the account created by the Merchant on the Payment Gateway, which is used to authenticate and authorize transactions.</li>
                    <li><strong>"Payment Gateway API"</strong> means the application programming interface (API) that enables the A.M.A.P.S platform to communicate with the Payment Gateway.</li>
                    <li><strong>"Payment Gateway Token"</strong> means the unique identifier assigned to each transaction by the Payment Gateway, which is used to identify and authenticate transactions.</li>
                    <li><strong>"Payment Gateway Transaction ID"</strong> means the unique identifier assigned to each transaction by the A.M.A.P.S platform, which is used to identify and authenticate transactions.</li>
                    <li><strong>"Payment Gateway Merchant ID"</strong> means the unique identifier assigned to each Merchant by the Payment Gateway, which is used to identify and authenticate transactions.</li>
                    <li><strong>"Payment Gateway Customer ID"</strong> means the unique identifier assigned to each Customer by the Payment Gateway, which is used to identify and authenticate transactions.</li>
                </ul>
                <h2>3. Acceptance of Terms</h2>
                <p>By registering or using the A.M.A.P.S platform, you agree to be bound by these Terms, as well as any additional guidelines, rules, or policies made available to you by Ojapay Nigeria Limited. These Terms constitute a legally binding agreement between you and Ojapay Nigeria Limited</p>
                <h2>4. User Account and Password</h2>
                <p>You are responsible for maintaining the confidentiality of your User Account and Password. You are also responsible for all activities that occur under your User Account or Password. You agree to immediately notify Ojapay Nigeria Limited of any unauthorized use of your User Account or Password or any other breach of security. Ojapay Nigeria Limited will not be liable for any loss or damage arising from your failure to comply with this security obligation.</p>
                <h2>5. Merchant Obligations</h2>
                <p>Merchants utilizing the A.M.A.P.S platform must:</p>
                <ul>
                    <li>Ensure compliance with all applicable laws, regulations, and industry standards, including data protection laws (such as the Nigeria Data Protection Regulation) and consumer protection laws.</li>
                    <li>Provide accurate and complete information about themselves and their business, including their name, address, contact details, and business description.</li>
                    <li>Maintain the security and confidentiality of their account credentials and immediately notify Ojapay Nigeria Limited of any unauthorized use of their account</li>
                    <li>Handle all customer complaints, returns, refunds, and disputes in compliance with their own policies, provided they meet A.M.A.P.S standards.</li>
                </ul>
                <h2>6. Customer Obligations</h2>
                <p>Customers utilizing the A.M.A.P.S platform must:</p>
                <ul>
                    <li>Ensure compliance with all
                        applicable laws, regulations, and industry standards, including data
                        protection laws (such as the Nigeria Data Protection Regulation) and
                        consumer protection laws.</li>
                    <li >Provide accurate, up-to-date
                        information regarding their business, products, and services.</li>
                    <li>Maintain the security and
                        confidentiality of their account credentials and immediately notify Ojapay
                        Nigeria Limited of any unauthorized use of their account.</li>
                    <li>Handle all customer complaints,
                        returns, refunds, and disputes in compliance with their own policies,
                        provided they meet A.M.A.P.S standards.</li>
                </ul>
                <p><b>4.1. Prohibited Activities</b></p>
                <p>Merchants are prohibited from using the A.M.A.P.S platform to:</p>
                <ul>
                    <li>Engage in illegal, fraudulent, or unethical activities.</li>
                    <li>Sell prohibited, illegal, or counterfeit goods and services.</li>
                    <li>Facilitate money laundering, terrorism financing, or other criminal activities.</li>
                    <li>Misrepresent or provide false information about their business or transactions.</li>
                </ul>
                <p>Ojapay
                    Nigeria Limited reserves the right to suspend or terminate any Merchant account
                    involved in prohibited activities.</p>

                <h2>7. Payment Processing</h2>

                <p><b>5.1. Overview</b></p>

                <p>A.M.A.P.S provides a secure and reliable payment gateway service that enables Merchants
                    to process payments from Customers using various payment methods, including
                    credit/debit cards, bank transfers, and mobile money. By using A.M.A.P.S,
                    Merchants authorize Ojapay Nigeria Limited to process payments on their behalf.</p>

                <p><b>5.2. Transaction Fees</b></p>

                <p>Merchants
                    will be charged transaction fees as agreed upon in the Merchant Agreement.
                    These fees will be deducted automatically from each transaction. Fees are
                    non-refundable except in cases where the transaction failed due to errors
                    caused by A.M.A.P.S.</p>

                <p><b>5.3. Payouts</b></p>

                <p>Payouts to Merchants will be processed in accordance with the payout schedule agreed in the Merchant Agreement. Delays may occur due to banking holidays, technical
                    issues, or pending reviews for suspected fraudulent activity.</p>

                <h2>6. Chargebacks and Disputes</h2>

                <p>Merchants bear full responsibility for any chargebacks initiated by Customers. Ojapay
                    Nigeria Limited will provide details about the transaction, but all chargeback
                    resolutions are between the Merchant and the Customer.</p>

                <p>Merchants must maintain clear and transparent refund and return policies, which should be
                    clearly communicated to Customers at the time of purchase.</p>

                <p><b>6.1. Fraud Prevention</b></p>

                <p>Ojapay Nigeria Limited employs security measures and monitoring systems to detect and
                    prevent fraudulent activity on the A.M.A.P.S platform. Merchants are required
                    to cooperate with any fraud investigation initiated by A.M.A.P.S or relevant
                    authorities.</p>

                <h2>7. Merchant Account Management</h2>

                <p>Merchants are required to:</p>
                <ul>
                    <li>Keep their account information (such as banking details, business address, and contact information)
                        accurate and up-to-date.</li>
                    <li>Notify A.M.A.P.S immediately of any changes that may affect their use of the platform or ability to process transactions.</li>
                </ul>

                <p>Failure to maintain accurate account information may result in delayed payouts, account
                    suspension, or termination.</p>

                <h2>8. Intellectual Property Rights</h2>

                <p>All intellectual property, including but not limited to trademarks, logos, designs,
                    source code, and content available on the A.M.A.P.S platform, are owned by or
                    licensed to <b>Ojapay Nigeria Limited</b>. You may not copy, reproduce, modify,
                    or distribute any materials from the platform without prior written consent.</p>

                <p>Merchants may display A.M.A.P.S trademarks or branding in marketing materials only with
                    express permission from Ojapay Nigeria Limited and in compliance with branding
                    guidelines.</p>

                <h2>9. Data Protection and Privacy</h2>

                <p><b>Ojapay Nigeria Limited</b> is committed to safeguarding
                    personal data and ensuring compliance with the Nigeria Data Protection
                    Regulation (NDPR) and other applicable data protection laws.</p>

                <p><b>9.1. Collection of Data</b></p>

                <p>We collect, store, and process personal data such as Customer and Merchant
                    information, payment details, and transaction data. By using A.M.A.P.S, you
                    agree to the collection, use, and sharing of this data in accordance with our
                    [Privacy Policy].</p>

                <p><b>9.2. Data Security</b></p>

                <p>We take reasonable steps to protect your personal data against unauthorized
                    access, alteration, disclosure, or destruction. However, we cannot guarantee
                    absolute security. Merchants and Customers are responsible for maintaining the
                    confidentiality of their account information and passwords.</p>

                <h2>10. Limitation of Liability</h2>

                <p>To
                    the fullest extent permitted by law, <b>Ojapay Nigeria Limited</b> and its
                    affiliates, officers, directors, employees, or agents shall not be liable for:</p>

                <ul>
                    <li>Any indirect, incidental, punitive, or consequential damages, including loss of revenue or data.</li>
                    <li>Losses resulting from any errors, failures, or interruptions in the platform's operation.</li>
                    <li>Any losses or damages arising from the use of the platform by unauthorized third parties.</li>
                </ul>

                <p>Our total liability for any claim arising from the use of A.M.A.P.S shall not
                    exceed the amount you paid, if any, to use the platform within the last six
                    months.</p>

                <h2>11. Indemnification</h2>

                <p>You agree to indemnify, defend, and hold harmless <b>Ojapay Nigeria Limited</b> and
                    its affiliates from any claims, liabilities, damages, or expenses (including
                    legal fees) arising from your breach of these Terms or your use of the
                    A.M.A.P.S platform.</p>

                <h2>12. Suspension and Termination</h2>

                <p>OjapayNigeria Limited reserves the right to suspend or terminate your account if:</p>
                <ul>
                    <li>You violate these Terms.</li>
                    <li>Your account is involved in suspicious or fraudulent activities.</li>
                    <li>There is non-payment of fees or charges.</li>
                </ul>

                <p><b>12.1. Termination by Merchant</b></p>

                <p>Merchants may terminate their use of A.M.A.P.S by closing their account. Termination does
                    not absolve the Merchant of any outstanding financial obligations.</p>

                <h2>13. Modifications to Terms</h2>

                <p>Ojapay Nigeria Limited reserves the right to modify these Terms at any time. We will
                    notify Merchants of any material changes via email or the platform. Continued
                    use of A.M.A.P.S after such modifications indicates your acceptance of the
                    revised Terms.</p>

                <h2>14. Governing Law and Dispute Resolution</h2>

                <p>These Terms are governed by and construed in accordance with the laws of the Federal
                    Republic of Nigeria. Any disputes arising from these Terms shall be resolved
                    through amicable negotiations or, if unresolved, through arbitration in
                    accordance with the rules of the Lagos Court of Arbitration.</p>

                <h2>15. Contact Information</h2>

                <p>If you have any questions or concerns about these Terms, please contact us at:</p>

                <p><b>Ojapay Nigeria Limited</b><br/>Email: info@ojapay.com<br/>Phone: +2349112163220<br/> Address: 3 Theophilus Orji street, Lekki phase 1, Lagos</p>
            </Container>

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <Button
                    variant="primary"
                    className="scroll-to-top"
                    onClick={scrollToTop}
                >
                    ↑ Scroll to Top
                </Button>
            )}
        </div>
    );
};

export default TermsAndConditions;
