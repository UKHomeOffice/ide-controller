// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Image = ({ image, imageAlt, className }) => {
  return (
    <div
      className={`photoContainer--photo ${className}`}
      alt={imageAlt}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

Image.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  imageAlt: '',
  className: '',
};

export default Image;
