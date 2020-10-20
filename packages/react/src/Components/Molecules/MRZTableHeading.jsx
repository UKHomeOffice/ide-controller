// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const MRZTableHeading = ({ headingOne, headingTwo, headingThree }) => {
  return (
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th className="govuk-table__header font--19pt" scope="col">
          {headingOne}
        </th>
        <th className="govuk-table__header font--19pt" scope="col">
          {headingTwo}
        </th>
        <th className="govuk-table__header font--19pt" scope="col">
          {headingThree}
        </th>
      </tr>
    </thead>
  );
};

MRZTableHeading.propTypes = {
  headingOne: PropTypes.string,
  headingTwo: PropTypes.string,
  headingThree: PropTypes.string,
};

MRZTableHeading.defaultProps = {
  headingOne: '',
  headingTwo: '',
  headingThree: '',
};

export default MRZTableHeading;
