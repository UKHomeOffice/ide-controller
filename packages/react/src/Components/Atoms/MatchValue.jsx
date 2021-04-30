// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const MatchValue = ({ percentage, passState, className }) => {
  return (
    <h1 className={`govuk-heading-xl ${passState} ${className}`}>
      {percentage ? `${percentage}%` : 'No data'}
    </h1>
  );
};

MatchValue.propTypes = {
  percentage: PropTypes.number,
  passState: PropTypes.string,
  className: PropTypes.string,
};

MatchValue.defaultProps = {
  percentage: NaN,
  passState: 'neutral',
  className: '',
};

export default MatchValue;
