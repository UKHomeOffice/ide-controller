// Global imports
import React from 'react';

// Local imports
import Image from './Atoms/Image';
import './Controller.scss';

const ChipImage = () => {
  return (
    <div className="govuk-grid-column-one-third image-padding">
      <div className="photoContainer--photo medium at6">
        <span className="shadow">
          <Image imageID="CD_SCDG2_PHOTO" imageAlt="Chip" />
        </span>
      </div>
    </div>
  );
};

export default ChipImage;
