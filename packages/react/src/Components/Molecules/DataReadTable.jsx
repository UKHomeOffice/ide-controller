// Global imports
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';

const chipReadText = (chipRead) => {
  return chipRead ? 'successful' : 'No data';
};
const chipReadClassName = (chipRead) => {
  return chipRead ? 'passed' : 'neutral';
};

const mrzReadText = (mrzRead) => {
  return mrzRead ? 'successful' : 'No data';
};
const mrzReadClassName = (mrzRead) => {
  return mrzRead ? 'passed' : 'neutral';
};

const DataReadTable = () => {
  const { CD_SCDG1_CODELINE, CD_CODELINE } = useContext(EventSourceContext);

  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip opened"
          tagStatus={chipReadClassName(CD_SCDG1_CODELINE)}
          tagText={chipReadText(CD_SCDG1_CODELINE)}
        />
        <TableRow
          rowLabel="MRZ read"
          tagStatus={mrzReadClassName(CD_CODELINE)}
          tagText={mrzReadText(CD_CODELINE)}
        />
      </tbody>
    </table>
  );
};
export default DataReadTable;
