// Global imports
import React from 'react';

const MatchTable = () => {
  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption">
        Automated image comparisons
      </caption>
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
        <tr className="govuk-table__row">
          <th
            className="govuk-table__cell govuk-!-font-weight-regular"
            scope="row"
          >
            Chip to document
          </th>
          <td className="govuk-table__cell">
            <strong className="govuk-tag govuk-tag--neutral app-task-list__task-completed">
              Ready
            </strong>
          </td>
        </tr>
        <tr className="govuk-table__row">
          <th
            className="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half"
            scope="row"
          >
            Chip to camera
          </th>
          <td className="govuk-table__cell govuk-!-width-one-half">
            <strong className="govuk-tag govuk-tag--neutral app-task-list__task-completed">
              Ready
            </strong>
          </td>
        </tr>
        <tr className="govuk-table__row">
          <th
            className="govuk-table__cell govuk-!-font-weight-regular"
            scope="row"
          >
            Document to camera
          </th>
          <td className="govuk-table__cell">
            <strong className="govuk-tag govuk-tag--failed app-task-list__task-completed">
              Ready
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MatchTable;
