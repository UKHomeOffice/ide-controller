// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// move to config
const acceptableScore = 2800;

const resultText = (score) => {
  if (score >= acceptableScore) return 'PASS';
  if (score < acceptableScore) return 'FAIL';

  return '';
};

const MatchText = ({ score, passState }) => {
  return (
    <h1 className={`govuk-heading-xl ${passState}`}>{resultText(score)}</h1>
  );
};

MatchText.propTypes = {
  score: PropTypes.number,
  passState: PropTypes.string,
};

MatchText.defaultProps = {
  score: NaN,
  passState: 'neutral',
};

export default MatchText;
