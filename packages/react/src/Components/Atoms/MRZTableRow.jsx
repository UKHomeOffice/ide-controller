// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const MRZTableRow = ({ heading, chipData, MRZData }) => {
  return (
    <tr className="govuk-table__row">
      <th className="govuk-table__cell" scope="row">
        {heading}
      </th>
      <td className="govuk-table__cell">{chipData}</td>
      <td className="govuk-table__cell">{MRZData}</td>
    </tr>
  );
};

MRZTableRow.propTypes = {
  heading: PropTypes.string,
  chipData: PropTypes.string,
  MRZData: PropTypes.string,
};

MRZTableRow.defaultProps = {
  heading: '',
  chipData: '',
  MRZData: '',
};

export default MRZTableRow;
