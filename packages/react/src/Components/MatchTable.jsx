// Global imports
import React from 'react';

const MatchTable = () => {
  return (
    <table class="govuk-table">
      <caption class="govuk-table__caption">Automated image comparisons</caption>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th class="govuk-table__header govuk-visually-hidden govuk-!-width-one-half" scope="col">Image comparisons</th>
          <th class="govuk-table__header govuk-visually-hidden govuk-!-width-one-half" scope="col">Result</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <th class="govuk-table__cell govuk-!-font-weight-regular" scope="row">Chip to document</th>
          <td class="govuk-table__cell"><strong class="govuk-tag govuk-tag--neutral app-task-list__task-completed">Ready</strong></td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half" scope="row">Chip to camera</th>
          <td class="govuk-table__cell govuk-!-width-one-half"><strong class="govuk-tag govuk-tag--neutral app-task-list__task-completed">Ready</strong></td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__cell govuk-!-font-weight-regular" scope="row">Document to camera</th>
          <td class="govuk-table__cell"><strong class="govuk-tag govuk-tag--failed app-task-list__task-completed">Ready</strong></td>
        </tr>
      </tbody>
    </table>
  );
};

export default MatchTable;
