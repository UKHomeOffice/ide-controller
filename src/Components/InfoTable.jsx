import React from 'react';

// Local imports
import TableRow from './TableRow';

const InfoTable = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-m">Further information</h2>
        <table className="govuk-table">
          <thead className="govuk-table__head">
            <tr className="gov-table__row">
              <th className="govuk-table__header" scope="col" width="180px" />
              <th className="govuk-table__header" scope="col" width="auto">
                Automated checks
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            <TableRow rowLabel="Live to chip" status="Pending Document" />
            <TableRow rowLabel="Live to document" status="Pending Document" />
            <TableRow rowLabel="Chip to document" status="Pending Document" />
            <TableRow rowLabel="Chip data" status="Pending Document" />
            <TableRow rowLabel="MRZ data" status="Pending Document" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoTable;
