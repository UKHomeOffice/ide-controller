// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ buttonVariant, onClick, children }) => {
  return (
    <button
      className={`govuk-button govuk-button--${buttonVariant}`}
      data-module="govuk-button"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttonVariant: 'secondary',
  onClick: null,
};

export default Button;
