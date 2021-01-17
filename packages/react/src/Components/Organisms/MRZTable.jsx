// Global imports
import React, { useContext } from 'react';

// Local imports
import { EventSourceContext } from '../Context/EventSource';
import { MRZTableRow, MRZTableHeading } from '../Molecules';

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
    const line1 = docData.codelineData.Line1;
    const line2 = docData.codelineData.Line2;
    const line3 = docData.codelineData.Line3;
    return `${line1}\n${line2}\n${line3}`;
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
          chipData={formtMRZData(CD_SCDG1_CODELINE_DATA, CD_CODELINE_DATA)}
          MRZData={formtMRZData(CD_CODELINE_DATA, CD_SCDG1_CODELINE_DATA)}
        />
      </tbody>
    </table>
  );
};

export default MRZTable;
