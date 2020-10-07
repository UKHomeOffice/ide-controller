// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { withContext } from '../Context';

const headerStateClass = (averageScore) => {
  const acceptablePercentage = 45;
  if (averageScore >= acceptablePercentage) return 'pass';
  if (averageScore < acceptablePercentage) return 'fail';

  return '';
};

const MatchValue = ({ value }) => {
  const { liveBioScore, bioChipScore, liveChipScore } =
    value.context?.match || {};
  const totalScore = liveBioScore + bioChipScore + liveChipScore;
  const divideBy = bioChipScore > 0 ? 3 : 2;
  const averageScore = totalScore / divideBy;
  const percentageScore = Math.round((averageScore / 8000) * 100);

  return (
    <>
      <span className="govuk-caption-m">Facial likeness between images</span>
      <h1
        className={`govuk-heading-xl govuk-!-font-size-48 ${headerStateClass(
          percentageScore
        )}`}
      >
        {percentageScore ? `${percentageScore}%` : 'Ready'}
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
