// Global imports
import React from 'react';

const MRZTable = () => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Read from chip
        </th>
        <th scope="col" className="govuk-table__header">
          Read from MRZ
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      <tr className="govuk-table__row">
        <th className="govuk-table__cell" scope="row">
          Document number
        </th>
        <td className="govuk-table__cell">No chip</td>
        <td className="govuk-table__cell">No Data</td>
      </tr>
      <tr className="govuk-table__row">
        <th className="govuk-table__cell" scope="row">
          Document expiry date
        </th>
        <td className="govuk-table__cell">No chip</td>
        <td className="govuk-table__cell">No Data</td>
      </tr>
      <tr className="govuk-table__row">
        <th className="govuk-table__cell" scope="row">
          Document type
        </th>
        <td className="govuk-table__cell">No chip</td>
        <td className="govuk-table__cell">No Data</td>
      </tr>
      <tr className="govuk-table__row">
        <th className="govuk-table__cell" scope="row">
          Document issuer
        </th>
        <td className="govuk-table__cell">No chip</td>
        <td className="govuk-table__cell">No Data</td>
      </tr>
      <tr className="govuk-table__row">
        <th className="govuk-table__cell" scope="row">
          MRZ
        </th>
        <td className="govuk-table__cell">No chip</td>
        <td className="govuk-table__cell">No Data</td>
      </tr>
    </tbody>
  </table>
);

export default MRZTable;
