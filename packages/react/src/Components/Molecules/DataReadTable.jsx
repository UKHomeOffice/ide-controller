// Global imports
import React, { useContext } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';
import { END_OF_DOCUMENT_DATA } from '../../config/EventSource';

const tagClassName = (primaryTagData, chipData = null) => {
  const noData = !chipData && !primaryTagData;
  if (noData) return 'neutral';
  const checForChip = chipData === null;
  if (checForChip) return 'passed';
  const primaryMatchChip = primaryTagData.data === chipData.data;
  return primaryMatchChip ? 'passed' : 'warning';
};

const DataReadTable = () => {
  const {
    CD_SCDG1_CODELINE_DATA,
    CD_CODELINE_DATA,
    RF_CHIP_OPENED_SUCCESSFULLY,
    CD_CODELINE,
    eventSourceEvent,
  } = useContext(EventSourceContext);

  const didFinishScan = eventSourceEvent === END_OF_DOCUMENT_DATA;

  const handelNoChipScan = () => {
    const failedToScan = !RF_CHIP_OPENED_SUCCESSFULLY;

    return didFinishScan && failedToScan ? 'warning' : 'No data';
  };

  const handelNoMRZ = () => {
    const noMRZData = !CD_CODELINE?.data;

    return didFinishScan && noMRZData ? 'warning' : 'No data';
  };

  return (
    <table className="govuk-table font--32">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Open chip"
          tagStatus={tagClassName(CD_SCDG1_CODELINE_DATA)}
          tagText={
            RF_CHIP_OPENED_SUCCESSFULLY ? 'successful' : handelNoChipScan()
          }
        />
        <TableRow
          rowLabel="Read MRZ"
          tagStatus={tagClassName(CD_CODELINE_DATA, CD_SCDG1_CODELINE_DATA)}
          tagText={CD_CODELINE?.data ? 'successful' : handelNoMRZ()}
        />
      </tbody>
    </table>
  );
};
export default DataReadTable;
