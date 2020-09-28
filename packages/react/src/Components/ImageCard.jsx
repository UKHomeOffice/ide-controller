// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports

const ImageCard = ({ children }) => {
  return (
    <div className="govuk-grid-column-one-third image-padding">
      <div className="photoContainer">
        <span className="shadow">{children}</span>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ImageCard;
