// Golbal imports
import PropTypes from 'prop-types';
import React from 'react';

const Tag = ({ tagText, tagStatus }) => {
  return (
    <strong className={`govuk-tag font--26 bg--${tagStatus}`}>{tagText}</strong>
  );
};

Tag.propTypes = {
  tagStatus: PropTypes.oneOf(['neutral', 'passed', 'failed', 'warning'])
    .isRequired,
  tagText: PropTypes.string.isRequired,
};

export default Tag;
