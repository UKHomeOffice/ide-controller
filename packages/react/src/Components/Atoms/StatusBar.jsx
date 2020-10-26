// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const StatusBar = ({ visible, status, text, className }) => {
  return (
    visible && (
      <div
        className={`status-bar ide-status-wrapper-alt status bg--${status} ${className}`}
      >
        <h3 className="govuk-heading-s">{text}</h3>
      </div>
    )
  );
};

StatusBar.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  status: PropTypes.string,
  className: PropTypes.string,
};

StatusBar.defaultProps = {
  text: '',
  visible: false,
  status: 'neutral',
  className: '',
};

export default StatusBar;
