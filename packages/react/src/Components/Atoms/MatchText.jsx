// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const resultText = (averageScore) => {
  const acceptablePercentage = 45;
  if (averageScore >= acceptablePercentage) return 'PASS';
  if (averageScore < acceptablePercentage) return 'FAIL';

  return '';
};

const MatchText = ({ percentage, passState }) => {
  return (
    <h1 className={`govuk-heading-xl font--xxl ${passState}`}>
      {resultText(percentage)}
    </h1>
  );
};

MatchText.propTypes = {
  percentage: PropTypes.number,
  passState: PropTypes.string,
};

MatchText.defaultProps = {
  percentage: NaN,
  passState: 'neutral',
};

export default MatchText;
