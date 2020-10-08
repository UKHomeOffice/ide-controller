// Global imports
import React, { useContext } from 'react';

// Local imports
import { EventSourceContext } from '../Context/EventSource';

const headerStateClass = (averageScore) => {
  const acceptablePercentage = 45;
  if (averageScore >= acceptablePercentage) return 'pass';
  if (averageScore < acceptablePercentage) return 'fail';

  return '';
};

const MatchValue = () => {
  const { liveBioScore, bioChipScore, liveChipScore } = useContext(
    EventSourceContext
  );
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

export default MatchValue;
