// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { withContext } from '../Context';

const MatchValue = ({ value }) => {
  const { match } = value.context;
  const percentage = (score) => Math.round((score / 7480) * 100);
  const headerStateClass = ({ score } = {}) => {
    if (percentage(score) >= 80) return 'pass';
    if (percentage(score) < 80) return 'fail';

    return '';
  };
  const headerText = ({ score } = {}) => {
    if (score === undefined) return 'Ready';
    if (typeof score === 'number') return `${percentage(score)}%`;

    return '';
  };

  return (
    <>
      <span className="govuk-caption-m">Facial likeness between images</span>
      <h1
        className={`govuk-heading-xl govuk-!-font-size-48 ${headerStateClass(
          match
        )}`}
      >
        {headerText(match)}
      </h1>
    </>
  );
};

MatchValue.propTypes = {
  value: PropTypes.shape({
    context: PropTypes.shape({
      match: PropTypes.shape({}),
    }),
    setContext: PropTypes.func,
  }),
};

MatchValue.defaultProps = {
  value: { match: { score: 0 } },
};

export default withContext(MatchValue);
