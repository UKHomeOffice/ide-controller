// Global imports
import React from 'react';

// Local imports
import MRZTableRow from './MRZTableRow';
import MRZTableHeading from './MRZTableHeading';

const MRZTable = () => (
  <table className="govuk-table">
    <MRZTableHeading
      headingOne=""
      headingTwo="Data from Chip"
      headingThree="Data from MRZ"
    />
    <tbody className="govuk-table__body">
      <MRZTableRow
        heading="Document number"
        chipData="No Data"
        MRZData="No Data"
      />
      <MRZTableRow
        heading="Document expiry date"
        chipData="No Data"
        MRZData="No Data"
      />
      <MRZTableRow
        heading="Document type"
        chipData="No Data"
        MRZData="No Data"
      />
      <MRZTableRow
        heading="Document issuer"
        chipData="No Data"
        MRZData="No Data"
      />
      <MRZTableRow heading="MRZ" chipData="No Data" MRZData="No Data" />
    </tbody>
  </table>
);

export default MRZTable;
