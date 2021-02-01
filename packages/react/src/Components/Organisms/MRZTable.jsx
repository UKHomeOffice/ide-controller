// Global imports
import React, { useContext } from 'react';

// Local imports
import { EventSourceContext } from '../Context/EventSource';
import { MRZTableRow, MRZTableHeading } from '../Molecules';
import { escapeHtml } from '../../helpers/common';

const getDocNumber = (docData) => {
  return docData ? docData.codelineData.DocNumber : 'No Data';
};

const formatExpiryDate = (docData) => {
  if (docData) {
    const day = docData.codelineData.ExpiryDate.Day;
    const month = docData.codelineData.ExpiryDate.Month;
    const year = docData.codelineData.ExpiryDate.Year;
    return `${day}/${month}/${year}`;
  }
  return 'No Data';
};

const getDocumentType = (docData) => {
  return docData ? docData.codelineData.DocType : 'No Data';
};

const getIssuingState = (docData) => {
  return docData ? docData.codelineData.IssuingState : 'No  Data';
};

const formtMRZData = (docData) => {
  if (docData) {
    const docLine1 = docData.codelineData.Line1;
    const docLine2 = docData.codelineData.Line2;
    const docLine3 = docData.codelineData.Line3;

    return `${docLine1}\n${docLine2}\n${docLine3}`;
  }
  return 'No Data';
};

const formtMRZDataWithHighlight = (docData, chipData = '') => {
  if (docData && chipData) {
    const docLine1 = docData.codelineData.Line1;
    const docLine2 = docData.codelineData.Line2;
    const docLine3 = docData.codelineData.Line3;

    const chipLine1 = chipData.codelineData.Line1;
    const chipLine2 = chipData.codelineData.Line2;
    const chipLine3 = chipData.codelineData.Line3;

    const docLine = `${docLine1}\n${docLine2}\n${docLine3}`;
    let chipLine = `${chipLine1}\n${chipLine2}\n${chipLine3}`;

    const diff = [];
    docLine.split('').forEach((val, i) => {
      if (val !== chipLine.charAt(i)) diff.push(`{{${val}}}`);
      else diff.push(val);
    });

    chipLine = escapeHtml(diff.join(''));

    chipLine = chipLine
      .replace(/{{/g, '<span class="highlight">')
      .replace(/}}/g, '</span>');

    return chipLine;
  }

  return 'No Data';
};

const MRZTable = () => {
  const { CD_SCDG1_CODELINE_DATA, CD_CODELINE_DATA } = useContext(
    EventSourceContext
  ).eventSourceContext;

  return (
    <table className="govuk-table">
      <MRZTableHeading
        headingOne=""
        headingTwo="Read from chip"
        headingThree="Read from MRZ"
      />
      <tbody className="govuk-table__body">
        <MRZTableRow
          heading="Document number"
          chipData={getDocNumber(CD_SCDG1_CODELINE_DATA)}
          MRZData={getDocNumber(CD_CODELINE_DATA)}
        />
        <MRZTableRow
          heading="Document expiry date"
          chipData={formatExpiryDate(CD_SCDG1_CODELINE_DATA)}
          MRZData={formatExpiryDate(CD_CODELINE_DATA)}
        />
        <MRZTableRow
          heading="Document type"
          chipData={getDocumentType(CD_SCDG1_CODELINE_DATA)}
          MRZData={getDocumentType(CD_CODELINE_DATA)}
        />
        <MRZTableRow
          heading="Document issuer"
          chipData={getIssuingState(CD_SCDG1_CODELINE_DATA)}
          MRZData={getIssuingState(CD_CODELINE_DATA)}
        />
        <MRZTableRow
          heading="MRZ"
          chipData={formtMRZData(CD_SCDG1_CODELINE_DATA)}
          MRZData={formtMRZDataWithHighlight(
            CD_CODELINE_DATA,
            CD_SCDG1_CODELINE_DATA
          )}
        />
      </tbody>
    </table>
  );
};

export default MRZTable;
