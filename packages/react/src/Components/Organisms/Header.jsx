// Global imports
import React from 'react';

const Header = () => (
  <header
    className="govuk-header dragable"
    role="banner"
    data-module="govuk-header"
  >
    <div className="govuk-header__container govuk-width-container">
      <div className="govuk-header__content">
        <span className="govuk-header__link govuk-header__link--service-name">
          Imposter detection equipment
        </span>
      </div>
    </div>
  </header>
);

export default Header;
