// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Tag } from '../Atoms';

const TableRow = ({ rowLabel, status, statusText }) => {
  return (
    <tr className="govuk-table__row">
      <th
        className="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half"
        scope="row"
      >
        {rowLabel}
      </th>
      <td className="govuk-table__cell govuk-!-width-one-half">
        <Tag status={status} statusText={statusText} />
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  rowLabel: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
};

export default TableRow;
