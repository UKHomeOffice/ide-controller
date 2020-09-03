import React from 'react';

export default function Header() {
  return (
    <header className="govuk-header " role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__content">
          <a
            href="/"
            className="govuk-header__link govuk-header__link--service-name"
          >
            Imposter detection equipment
          </a>
        </div>
      </div>
    </header>
  );
}
