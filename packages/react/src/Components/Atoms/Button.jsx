// Global imports
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonText, buttonVariant }) => {
  return (
    <button
      className={`govuk-button govuk-button--${buttonVariant}`}
      data-module="govuk-button"
      type="button"
    >
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string,
};

Button.defaultProps = {
  buttonVariant: 'secondary',
};

export default Button;
