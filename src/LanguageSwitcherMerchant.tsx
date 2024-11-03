import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './shared/assets/css/LanguageSwitcherMerchant.css'

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-switcher-merchant">
            <DropdownButton id="dropdown-basic-button" title={i18n.language ? i18n.language.toUpperCase() : 'EN'}>
                <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('fr')}>French</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('es')}>Spanish</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('pt')}>Portuguese</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('sw')}>Swahili</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default LanguageSwitcher;

