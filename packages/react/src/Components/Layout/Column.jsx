import PropTypes from 'prop-types';
import React from 'react';

const Column = ({ size, className, children }) => (
  <div className={`govuk-grid-column-${size} ${className}`}>{children}</div>
);

Column.propTypes = {
  size: PropTypes.oneOf([
    'one-third',
    'one-quarter',
    'one-half',
    'two-thirds',
    'three-quarters',
    'full',
  ]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Column.defaultProps = {
  size: '',
  className: '',
};

export default Column;
