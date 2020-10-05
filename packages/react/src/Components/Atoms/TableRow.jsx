// Global imports
import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ rowLabel, status }) => {
  return (
    <tr className="govuk-table__row">
      <th
        className="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half"
        scope="row"
      >
        {rowLabel}
      </th>
      <td className="govuk-table__cell govuk-!-width-one-half">
        <strong className="govuk-tag govuk-tag--passed app-task-list__task-completed govuk-!-font-size-16">
          {status}
        </strong>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  rowLabel: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TableRow;
