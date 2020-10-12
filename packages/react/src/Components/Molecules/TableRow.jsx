// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Tag } from '../Atoms';

const TableRow = ({ rowLabel, cellText, tagText, type, tagStatus }) => {
  const cellContent = () => {
    if (cellText === undefined) {
      return <Tag tagStatus={tagStatus} tagText={tagText} />;
    }
    return cellText;
  };

  return (
    <tr className="govuk-table__row">
      <th className={`govuk-table__${type}`} scope="row">
        {rowLabel}
      </th>
      <td className="govuk-table__cell govuk-!-width-one-quarter">
        {cellContent()}
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  rowLabel: PropTypes.string.isRequired,
  cellText: PropTypes.string,
  type: PropTypes.string,
  tagText: PropTypes.string,
  tagStatus: PropTypes.string,
};

TableRow.defaultProps = {
  cellText: undefined,
  tagText: undefined,
  tagStatus: undefined,
  type: 'cell',
};

export default TableRow;
