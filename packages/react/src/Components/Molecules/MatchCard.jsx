// Global imports
import React, { useContext } from 'react';

// Local imports
import { MatchValue, MatchText } from '../Atoms';
import { ScoreContext } from '../Context/Score';
import { Column, Row } from '../Layout';

const minScore = 1300;
const maxScore = 6000;
const acceptableScore = 2800;

const headerStateClass = (score) => {
  if (score >= acceptableScore) return 'pass';
  if (score < acceptableScore) return 'fail';

  return 'neutral';
};

const MatchCard = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, liveChipScore } = scoreContext;
  const score = liveChipScore || liveBioScore;

  const percentageScore =
    score < minScore
      ? 0
      : score > maxScore
      ? 100
      : Math.round((score / maxScore) * 100);

  return (
    <Row>
      <Column size="one-half">
        <span className="govuk-caption-m font--19pt">Image likeness</span>
        <MatchValue
          percentage={percentageScore}
          passState={headerStateClass(score)}
        />
      </Column>
      <Column size="one-half">
        <span className="govuk-caption-m font--19pt">Result</span>
        <MatchText percentage={score} passState={headerStateClass(score)} />
      </Column>
    </Row>
  );
};

export default MatchCard;
