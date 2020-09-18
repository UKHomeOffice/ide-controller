// Global imports
import React from 'react';

const ReadTable = () => {
  return (
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
        <tr className="govuk-table__row">
          <th
            className="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half"
            scope="row"
          >
            Chip opened
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
            MRZ read
          </th>
          <td className="govuk-table__cell">
            <strong className="govuk-tag govuk-tag--passed app-task-list__task-completed govuk-!-font-size-16">
              Ready
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReadTable;
