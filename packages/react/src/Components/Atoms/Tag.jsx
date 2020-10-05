// Golbal imports
import PropTypes from 'prop-types';
import React from 'react';

const Tag = ({ statusText, status }) => {
  return (
    <strong className={`govuk-tag tag-state--${status}`}>{statusText}</strong>
  );
};

Tag.propTypes = {
  status: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
};

export default Tag;
