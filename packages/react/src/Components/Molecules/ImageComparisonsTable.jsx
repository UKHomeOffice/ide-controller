// Global imports
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { ScoreContext } from '../Context/Score';
import { MINSCORE, MAXSCORE, ACCEPTABLESCORE } from '../../config/score';

const headerStateClass = (score) => {
  if (score >= ACCEPTABLESCORE) return 'passed';
  if (score < ACCEPTABLESCORE) return 'failed';

  return 'neutral';
};

const calculatePercentage = (score) => {
  if (score < MINSCORE) return 0;
  if (score > MAXSCORE) return 100;

  return Math.round((score / MAXSCORE) * 100);
};

const resultText = (score) => {
  const percent = calculatePercentage(score);
  if (percent < 45 && percent > 0) return 'FAIL';
  if (percent === 0) return 'No Data';
  if (percent >= 45) return 'PASS';

  return 'No Data';
};

const ImageComparisonsTable = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, bioChipScore, liveChipScore } = scoreContext;

  return (
    <table className="govuk-table font--19pt">
      <caption className="govuk-table__caption">Image comparisons</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip to document"
          tagStatus={headerStateClass(bioChipScore)}
          tagText={resultText(bioChipScore)}
        />
        <TableRow
          type="cell"
          rowLabel="Chip to camera"
          tagStatus={headerStateClass(liveChipScore)}
          tagText={resultText(liveChipScore)}
        />
        <TableRow
          rowLabel="Document to camera"
          tagStatus={headerStateClass(liveBioScore)}
          tagText={resultText(liveBioScore)}
        />
      </tbody>
    </table>
  );
};

ImageComparisonsTable.propTypes = {
  value: PropTypes.shape({
    context: PropTypes.shape({
      match: PropTypes.shape({}),
    }),
    setContext: PropTypes.func,
  }),
};

ImageComparisonsTable.defaultProps = {
  value: {},
};

export default ImageComparisonsTable;
