// Global imports
import React from 'react';

export default function Header() {
  return (
    <div className="govuk-header" role="banner" data-module="govuk-header">
      <div
        className="govuk-header__container"
        style={{ 'margin-left': '2.5%', 'margin-right': '2.5%' }}
      >
        <div
          className="govuk-header__content"
          style={{ 'padding-left': '0px' }}
        >
          <a
            href="/"
            className="govuk-header__link govuk-header__link--service-name"
          >
            Imposter detection equipment
          </a>
        </div>
      </div>
    </div>
  );
}
