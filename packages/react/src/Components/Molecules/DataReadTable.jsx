// Global imports
import React from 'react';

// Local imports
import TableRow from './TableRow';

const DataReadTable = () => {
  return (
    <table className="govuk-table font--32">
      <caption className="govuk-table__caption">Data read</caption>
      <tbody className="govuk-table__body">
        <TableRow
          rowLabel="Chip opened"
          tagStatus="neutral"
          tagText="No Data"
        />
        <TableRow rowLabel="MRZ read" tagStatus="neutral" tagText="No Data" />
      </tbody>
    </table>
  );
};
export default DataReadTable;
