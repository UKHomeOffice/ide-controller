// Global imports
import React, { useContext } from 'react';

// Local imports
import { MatchValue, MatchText } from '../Atoms';
import { ScoreContext } from '../Context/Score';
import { Column, Row } from '../Layout';

const headerStateClass = (averageScore) => {
  const acceptablePercentage = 45;
  if (averageScore >= acceptablePercentage) return 'pass';
  if (averageScore < acceptablePercentage) return 'fail';

  return 'neutral';
};

const MatchCard = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, liveChipScore } = scoreContext;
  const averageScore = liveChipScore || liveBioScore;
  const percentageScore = Math.round((averageScore / 8000) * 100);

  return (
    <Row>
      <Column size="one-half">
        <span className="govuk-caption-m font--19pt">Image likeness</span>
        <MatchValue
          percentage={percentageScore}
          passState={headerStateClass(percentageScore)}
        />
      </Column>
      <Column size="one-half">
        <span className="govuk-caption-m font--19pt">Result</span>
        <MatchText
          percentage={percentageScore}
          passState={headerStateClass(percentageScore)}
        />
      </Column>
    </Row>
  );
};

export default MatchCard;
