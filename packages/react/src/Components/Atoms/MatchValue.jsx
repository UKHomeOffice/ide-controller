// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const MatchValue = ({ percentage, passState }) => {
  return (
    <h1 className={`govuk-heading-xl ${passState}`}>
      {percentage ? `${percentage}%` : 'No data'}
    </h1>
  );
};

MatchValue.propTypes = {
  percentage: PropTypes.number,
  passState: PropTypes.string,
};

MatchValue.defaultProps = {
  percentage: NaN,
  passState: 'neutral',
};

export default MatchValue;
