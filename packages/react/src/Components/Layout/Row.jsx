// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Row = ({ children }) => <div className="govuk-grid-row">{children}</div>;

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Row;
