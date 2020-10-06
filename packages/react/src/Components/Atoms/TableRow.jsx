// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const TableRow = ({ rowLabel, status, type }) => {
  return (
    <tr className="govuk-table__row">
      <th className={`govuk-table__${type}`} scope="row">
        {rowLabel}
      </th>
      {status && (
        <td className="govuk-table__cell">
          <strong
            className="govuk-tag govuk-tag--failed app-task-list__task-completed"
            id="eligibility-completed"
          >
            {status}
          </strong>
        </td>
      )}
    </tr>
  );
};

TableRow.propTypes = {
  rowLabel: PropTypes.string.isRequired,
  status: PropTypes.string,
  type: PropTypes.string,
};

TableRow.defaultProps = {
  status: undefined,
  type: 'cell',
};

export default TableRow;
