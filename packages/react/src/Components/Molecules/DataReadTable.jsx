// Global imports
import React, { useContext, useEffect, useState } from 'react';

// Local imports
import TableRow from './TableRow';
import { EventSourceContext } from '../Context/EventSource';
import {
  END_OF_DOCUMENT_DATA,
  START_OF_DOCUMENT_DATA,
} from '../../config/EventSource';
import { escapeNewLine } from '../../helpers/common';

const tagStatusMap = {
  successful: 'passed',
  warning: 'warning',
  'No data': 'neutral',
};

const DataReadTable = () => {
  const {
    RF_CHIP_OPENED_SUCCESSFULLY,
    CD_CODELINE_DATA,
    CD_SCDG1_CODELINE_DATA,
    eventSourceEvent,
  } = useContext(EventSourceContext).eventSourceContext;

  const [MRZTagText, setMRZTagText] = useState('No data');
  const [chipTagText, setChipTagText] = useState('No data');
  const [didFinishScan, setDidFinishScan] = useState(
    eventSourceEvent === END_OF_DOCUMENT_DATA
  );

  const updateMRZText = () => {
    const noDocMRZData = !CD_CODELINE_DATA?.codelineData?.Data;

    const docMRZ = CD_CODELINE_DATA?.codelineData?.Data;
    const chipMRZ = CD_SCDG1_CODELINE_DATA?.codelineData?.Data;
    const chipDocMRZMismatch = escapeNewLine(docMRZ) !== chipMRZ;
    const text = noDocMRZData || chipDocMRZMismatch ? 'warning' : 'successful';

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

  useEffect(() => {
    const newScanTriggered = eventSourceEvent === START_OF_DOCUMENT_DATA;
    const clearDataButtonTriggered = eventSourceEvent?.startsWith('RESTART');
    if (newScanTriggered || clearDataButtonTriggered) {
      setMRZTagText('No data');
      setChipTagText('No data');
    }
  }, [eventSourceEvent]);

  return (
    <table className="govuk-table font--19pt">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip opened"
          tagStatus={tagStatusMap[chipTagText]}
          tagText={didFinishScan ? chipTagText : 'No data'}
        />
        <TableRow
          rowLabel="MRZ read"
          tagStatus={tagStatusMap[MRZTagText]}
          tagText={didFinishScan ? MRZTagText : 'No data'}
        />
      </tbody>
    </table>
  );
};

export default DataReadTable;
