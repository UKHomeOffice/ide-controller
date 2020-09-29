// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import '../Controller.scss';

const Image = ({ image, imageAlt }) => {
  return (
    <div
      className="photoContainer--photo medium"
      alt={imageAlt}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

// @todo add prop checks and defaults

export default Image;
