import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <header className="govuk-header " role="banner" data-module="govuk-header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <a href="#" className="govuk-header__link govuk-header__link--homepage">
              <span className="govuk-header__logotype">
                <svg>
                  <image src="/assets/images/govuk-logotype-crown.png" className="govuk-header__logotype-crown-fallback-image" width="36" height="32"></image>
                </svg>
                <span className="govuk-header__logotype-text">
                  GOV.UK
                </span>
              </span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;