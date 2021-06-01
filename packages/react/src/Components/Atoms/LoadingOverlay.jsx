// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const LoadingOverlay = ({ show }) => {
  return (
    <div className={`position-absolute ${!show && 'display-none'}`}>
      <div className="spinner-rolling">
        <div className="spinner-animation">
          <div />
        </div>
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  show: PropTypes.bool,
};

LoadingOverlay.defaultProps = {
  show: false,
};

export default LoadingOverlay;
