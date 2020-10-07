// Golbal imports
import PropTypes from 'prop-types';
import React from 'react';

const Tag = ({ tagText, tagStatus }) => {
  return <strong className={`govuk-tag bg--${tagStatus}`}>{tagText}</strong>;
};

Tag.propTypes = {
  tagStatus: PropTypes.string.isRequired,
  tagText: PropTypes.string.isRequired,
};

export default Tag;
