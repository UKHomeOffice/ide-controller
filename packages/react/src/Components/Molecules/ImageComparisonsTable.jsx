// Global imports
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { ScoreContext } from '../Context/Score';

const calculatePercentage = (score) => (score / 8000) * 100;

const resultText = (score) => {
  const percent = calculatePercentage(score);
  if (percent < 45 && percent > 0) {
    return 'FAIL';
  }
  if (percent === 0) {
    return 'No Data';
  }
  if (percent >= 45) {
    return 'PASS';
  }
  return 'No Data';
};

const resultClassName = (score) => {
  const percent = calculatePercentage(score);
  if (percent < 45 && percent > 0) {
    return 'fail';
  }
  if (percent === 0) {
    return 'warning';
  }
  if (percent >= 45) {
    return 'passed';
  }
  return 'neutral';
};

// govuk-table__cell govuk-!-font-weight-regular

const ImageComparisonsTable = () => {
  const { scoreContext } = useContext(ScoreContext);
  const { liveBioScore, bioChipScore, liveChipScore } = scoreContext;

  return (
    <table className="govuk-table font--30">
      <caption className="govuk-table__caption">Image comparisons</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip to document"
          tagStatus={resultClassName(bioChipScore)}
          tagText={resultText(bioChipScore)}
        />
        <TableRow
          type="cell"
          rowLabel="Chip to camera"
          tagStatus={resultClassName(liveChipScore)}
          tagText={resultText(liveChipScore)}
        />
        <TableRow
          rowLabel="Document to camera"
          tagStatus={resultClassName(liveBioScore)}
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
