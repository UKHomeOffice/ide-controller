// Golbal imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import '../Controller.scss';

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
