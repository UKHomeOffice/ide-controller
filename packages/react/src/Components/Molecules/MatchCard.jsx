// Global imports
import React, { useContext } from 'react';

// Local imports
import { MatchValue, MatchText } from '../Atoms';
import { ScoreContext } from '../Context/Score';
import { Column, Row } from '../Layout';
import { MINSCORE, MAXSCORE, ACCEPTABLESCORE } from '../../config/score';

const headerStateClass = (score) => {
  if (score >= ACCEPTABLESCORE) return 'pass';
  if (score < ACCEPTABLESCORE) return 'fail';

  return 'neutral';
};

const MatchCard = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, liveChipScore } = scoreContext;
  const score = liveChipScore || liveBioScore;

  const percentageScore =
    score < MINSCORE
      ? 0
      : score > MAXSCORE
      ? 100
      : Math.round((score / MAXSCORE) * 100);

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
        <MatchText score={score} passState={headerStateClass(score)} />
      </Column>
    </Row>
  );
};

export default MatchCard;
