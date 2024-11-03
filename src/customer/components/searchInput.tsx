import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/SearchInput.css";

const SearchInput: React.FC = () => {
  const { t } = useTranslation('customer_search');
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className="search-container">
      <div className={`search-input-group ${isActive ? 'active' : ''}`}>
        <input
          type="text"
          className="search-field"
          placeholder={t('search')}
          aria-label="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <button
          className="search-button"
          type="submit"
          aria-label="Search button"
        >
          {t('search')}
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
