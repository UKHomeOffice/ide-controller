// Global imports
import React from 'react';
import style from 'styled-components';

const StyledHeader = style.header`
  -webkit-app-region: drag;
  padding-top: 10px;
`;

export default function Header() {
  return (
    <StyledHeader
      className="govuk-header "
      role="banner"
      data-module="govuk-header"
    >
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
    </StyledHeader>
  );
}
