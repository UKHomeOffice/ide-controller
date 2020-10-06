// Global imports
import React from 'react';

// Local imports
import { TableRow } from '../Atoms';

const DataReadTable = () => {
  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow rowLabel="Live to chip" status="Pending Document" />
        <TableRow rowLabel="Live to document" status="Pending Document" />
      </tbody>
    </table>
  );
};
export default DataReadTable;
