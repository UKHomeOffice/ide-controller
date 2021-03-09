// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const statusMap = {
  success: 'passed',
  failed: 'failed',
  loading: 'info',
  scanBack: 'info',
  noData: 'info',
};

const StatusBar = ({ visible, status, text, className }) => {
  return (
    visible && (
      <div
        className={`status-bar ide-status-wrapper-alt status bg--${statusMap[status]} ${className}`}
      >
        <h3 className="govuk-heading-s">{text}</h3>
        {status === 'loading' && (
          <div className="ide-loader">
            <div />
            <div />
            <div />
          </div>
        )}
      </div>
    )
  );
};

StatusBar.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  status: PropTypes.oneOf([
    'success',
    'failed',
    'loading',
    'noData',
    'scanBack',
  ]),
  className: PropTypes.string,
};

StatusBar.defaultProps = {
  text: '',
  visible: false,
  status: 'loading',
  className: '',
};

export default StatusBar;
