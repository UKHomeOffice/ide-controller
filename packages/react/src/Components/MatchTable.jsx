// Global imports
import React from 'react';

// Local imports
import TableRow from './TableRow';

const MatchTable = () => {
  return (
    <>
      <table className="govuk-table">
        <caption className="govuk-table__caption">Image comparisons</caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th
              className="govuk-table__header govuk-visually-hidden govuk-!-width-one-half"
              scope="col"
            >
              Image comparisons
            </th>
            <th
              className="govuk-table__header govuk-visually-hidden govuk-!-width-one-half"
              scope="col"
            >
              Result
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <TableRow rowLabel="Live to chip" status="Pending Document" />
          <TableRow rowLabel="Live to document" status="Pending Document" />
          <TableRow rowLabel="Chip to document" status="Pending Document" />
        </tbody>
      </table>
    </>
  );
};

export default MatchTable;
