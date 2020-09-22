// Global imports
import React from 'react';

const GovButton = ( {buttonText, buttonVariant, buttonType} ) => {
  return (
    <button
      className={`govuk-button govuk-button--${buttonVariant}`}
      data-module="govuk-button"
      type={buttonType} 
      >
        { buttonText }
      </button>
  );
};

export default GovButton;