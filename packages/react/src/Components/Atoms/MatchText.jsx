// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const resultText = (averageScore) => {
  const acceptableScore = 2800;
  if (averageScore >= acceptableScore) return 'PASS';
  if (averageScore < acceptableScore) return 'FAIL';

  return '';
};

const MatchText = ({ percentage, passState }) => {
  return (
    <h1 className={`govuk-heading-xl ${passState}`}>
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
