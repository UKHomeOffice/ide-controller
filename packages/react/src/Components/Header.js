import React from 'react';

export default function Header(props) {
    return (
        <header className="govuk-header " role="banner" data-module="govuk-header">
            <div className="govuk-header__container govuk-width-container">
                  {/*<span className="govuk-header__logotype-text">*/}
                  {/*  {props.value}*/}
                  {/*</span>*/}
                <div class="govuk-header__content">
                    <a href="/" class="govuk-header__link govuk-header__link--service-name">
                        Imposter detection equipment
                    </a>
                </div>
            </div>
        </header>
    );
}