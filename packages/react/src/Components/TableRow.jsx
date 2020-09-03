// Global imports
import React from 'react';

const TableRow = ({ rowLabel, status }) => {
  return (
    <tr className="govuk-table__row">
      <th className="govuk-table__cell" scope="row">
        {rowLabel}
      </th>
      <td className="govuk-table__cell">
        <strong
          className="govuk-tag govuk-tag--failed app-task-list__task-completed"
          id="eligibility-completed"
        >
          {status}
        </strong>
      </td>
    </tr>
  );
};

export default TableRow;
