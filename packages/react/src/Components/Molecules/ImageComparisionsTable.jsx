// Global imports
import React from 'react';

// Local imports
import { TableRow } from '../Atoms';

const ImageComparisionsTable = () => {
  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption">Image comparisons</caption>
      <tbody className="govuk-table__body">
        <TableRow rowLabel="Live to chip" status="Pending Document" />
        <TableRow rowLabel="Live to document" status="Pending Document" />
        <TableRow rowLabel="Chip to document" status="Pending Document" />
      </tbody>
    </table>
  );
};
export default ImageComparisionsTable;
