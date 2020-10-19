// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const MRZTableRow = ({ heading, chipData, MRZData }) => {
  return (
    <tr className="govuk-table__row">
      <th
        className="govuk-table__cell font--19pt govuk-!-width-one-third"
        scope="row"
      >
        {heading}
      </th>
      <td className="govuk-table__cell font--19pt govuk-!-width-one-third word-break-all">
        {chipData}
      </td>
      <td className="govuk-table__cell font--19pt govuk-!-width-one-third word-break-all">
        {MRZData}
      </td>
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
