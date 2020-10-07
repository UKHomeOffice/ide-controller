// Global imports
import React from 'react';

// Local imports
import TableRow from './TableRow';

const DataReadTable = () => {
  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Live to chip"
          tagStatus="neutral"
          tagText="No Data"
        />
        <TableRow
          rowLabel="Live to document"
          tagStatus="neutral"
          tagText="No Data"
        />
      </tbody>
    </table>
  );
};
export default DataReadTable;
