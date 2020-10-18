// Global imports
import React, { useContext, useEffect, useState } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';
import { END_OF_DOCUMENT_DATA } from '../../config/EventSource';

const tagStatusMap = {
  successful: 'passed',
  warning: 'warning',
  'No data': 'neutral',
};

const DataReadTable = () => {
  const {
    RF_CHIP_OPENED_SUCCESSFULLY,
    CD_CODELINE,
    eventSourceEvent,
  } = useContext(EventSourceContext).eventSourceContext;

  const [MRZTagText, setMRZTagText] = useState('No data');
  const [chipTagText, setChipTagText] = useState('No data');
  const [didFinishScan, setDidFinishScan] = useState(
    eventSourceEvent === END_OF_DOCUMENT_DATA
  );

  const updateMRZText = () => {
    const noMRZData = !CD_CODELINE?.data;
    const text = noMRZData ? 'warning' : 'successful';
    setMRZTagText(text);
  };

  const updateChipText = () => {
    const text = RF_CHIP_OPENED_SUCCESSFULLY ? 'successful' : 'warning';
    setChipTagText(text);
  };

  useEffect(() => {
    setDidFinishScan(eventSourceEvent === END_OF_DOCUMENT_DATA);
    if (didFinishScan) {
      updateMRZText();
      updateChipText();
    }
  }, [eventSourceEvent, didFinishScan]);

  return (
    <table className="govuk-table font--32">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip opened"
          tagStatus={tagStatusMap[chipTagText]}
          tagText={didFinishScan ? chipTagText : 'No data'}
        />
        <TableRow
          rowLabel="Read MRZ"
          tagStatus={tagStatusMap[MRZTagText]}
          tagText={didFinishScan ? MRZTagText : 'No data'}
        />
        <TableRow rowLabel="MRZ read" tagStatus="neutral" tagText="No Data" />
      </tbody>
    </table>
  );
};
export default DataReadTable;
