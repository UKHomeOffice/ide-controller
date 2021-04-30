// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ buttonVariant, onClick, children, disabled, className }) => {
  return (
    <button
      className={`govuk-button font--19pt govuk-button--${buttonVariant} ${className}`}
      data-module="govuk-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="atoms-button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  buttonVariant: 'secondary',
  onClick: null,
  disabled: false,
  className: '',
};

export default Button;
