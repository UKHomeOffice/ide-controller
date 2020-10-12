// Global imports
import React, { useContext } from 'react';

// Local imports
import { ScoreContext } from '../Context/Score';

const headerStateClass = (averageScore) => {
  const acceptablePercentage = 45;
  if (averageScore >= acceptablePercentage) return 'pass';
  if (averageScore < acceptablePercentage) return 'fail';

  return '';
};

const MatchValue = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, bioChipScore, liveChipScore } = scoreContext;
  const totalScore = liveBioScore + bioChipScore + liveChipScore;
  const divideBy = bioChipScore > 0 ? 3 : 2;
  const averageScore = totalScore / divideBy;
  const percentageScore = Math.round((averageScore / 8000) * 100);

  return (
    <>
      <span className="govuk-caption-m font--30">
        Facial likeness between images
      </span>
      <h1
        className={`govuk-heading-xl font--xxl ${headerStateClass(
          percentageScore
        )}`}
      >
        {percentageScore ? `${percentageScore}%` : 'Ready'}
      </h1>
    </>
  );
};

export default MatchValue;
