// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ buttonVariant, onClick, children, disabled }) => {
  return (
    <button
      className={`govuk-button font--19pt govuk-button--${buttonVariant}`}
      data-module="govuk-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
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
};

Button.defaultProps = {
  buttonVariant: 'secondary',
  onClick: null,
  disabled: false,
};

export default Button;
