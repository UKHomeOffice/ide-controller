// Global imports
import React from 'react';

// Local imports
import TableRow from './TableRow';

const ReadTable = () => {
  return (
    <>
      <table className="govuk-table">
        <caption className="govuk-table__caption">Data read</caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th
              className="govuk-table__header govuk-visually-hidden govuk-!-width-one-half"
              scope="col"
            >
              Data source
            </th>
            <th
              className="govuk-table__header govuk-visually-hidden govuk-!-width-one-half"
              scope="col"
            >
              Read result
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <TableRow
            rowLabel="Chip opened"
            status="neutral"
            statusText="No chip"
          />
          <TableRow rowLabel="MRZ read" status="neutral" statusText="No chip" />
        </tbody>
      </table>
    </>
  );
};
export default ReadTable;
