// Global imports
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';

const tagText = (primaryTagData, chipData = null) => {
  const noData = !chipData && !primaryTagData;
  if (noData) return 'No Data';
  const checForChip = chipData === null;
  if (checForChip) return 'successful';
  const primaryMatchChip = primaryTagData.data === chipData.data;
  return primaryMatchChip ? 'successful' : 'warning';
};

const tagClassName = (primaryTagData, chipData = null) => {
  const noData = !chipData && !primaryTagData;
  if (noData) return 'neutral';
  const checForChip = chipData === null;
  if (checForChip) return 'passed';
  const primaryMatchChip = primaryTagData.data === chipData.data;
  return primaryMatchChip ? 'passed' : 'warning';
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
