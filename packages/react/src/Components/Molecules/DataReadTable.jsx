// Global imports
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';

const tagText = (primaryTagData, chipData = null) => {
  if (chipData) {
    if (primaryTagData.data === chipData.data) {
      return 'successful';
    }
    return 'warning';
  }
  return primaryTagData ? 'successful' : 'No data';
};

const tagClassName = (primaryTagData, chipData = null) => {
  if (chipData) {
    if (primaryTagData.data === chipData.data) {
      return 'passed';
    }
    return 'warning';
  }
  return primaryTagData ? 'passed' : 'neutral';
};

const DataReadTable = () => {
  const { CD_SCDG1_CODELINE_DATA, CD_CODELINE_DATA } = useContext(
    EventSourceContext
  );

  return (
    <table className="govuk-table font--32">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Open chip"
          tagStatus={tagClassName(CD_SCDG1_CODELINE_DATA)}
          tagText={tagText(CD_SCDG1_CODELINE_DATA)}
        />
        <TableRow
          rowLabel="Read MRZ"
          tagStatus={tagClassName(CD_CODELINE_DATA, CD_SCDG1_CODELINE_DATA)}
          tagText={tagText(CD_CODELINE_DATA, CD_SCDG1_CODELINE_DATA)}
        />
      </tbody>
    </table>
  );
};
export default DataReadTable;
