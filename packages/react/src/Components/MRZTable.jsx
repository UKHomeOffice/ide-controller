// Global imports
import React from 'react';

const MRZTable = () => {
  return (
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header"/>
          <th scope="col" class="govuk-table__header">Read from chip</th>
          <th scope="col" class="govuk-table__header">Read from MRZ</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <th class="govuk-table__cell">Document number</th>
          <td class="govuk-table__cell">No chip</td>
          <td class="govuk-table__cell">No Data</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell">Document expiry date</th>
          <td class="govuk-table__cell">No chip</td>
          <td class="govuk-table__cell">No Data</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell">Document type</th>
          <td class="govuk-table__cell">No chip</td>
          <td class="govuk-table__cell">No Data</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell">Document issuer</th>
          <td class="govuk-table__cell">No chip</td>
          <td class="govuk-table__cell">No Data</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell">MRZ</th>
          <td class="govuk-table__cell">No chip</td>
          <td class="govuk-table__cell">No Data</td>
        </tr>
      </tbody>
    </table>  
  );
};

export default MRZTable;