// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { ACCEPTABLESCORE } from '../../config/score';

const resultText = (score) => {
  if (score >= ACCEPTABLESCORE) return 'PASS';
  if (score < ACCEPTABLESCORE) return 'FAIL';

  return '';
};

const MatchText = ({ score, passState, className }) => {
  return (
    <h1 className={`govuk-heading-xl ${passState} ${className}`}>
      {resultText(score)}
    </h1>
  );
};

MatchText.propTypes = {
  score: PropTypes.number,
  passState: PropTypes.string,
  className: PropTypes.string,
};

MatchText.defaultProps = {
  score: NaN,
  passState: 'neutral',
  className: '',
};

export default MatchText;
