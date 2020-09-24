// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from './ImageContext';
import Config from './Config';
import './Controller.css';

const ChipImage = () => {
  return (
    <div className="govuk-grid-column-one-third image-padding">
      <ImageConsumer>
        {(fullPage) => {
          const datamap = new Map(fullPage);
          const image = datamap.has('CD_SCDG2_PHOTO')
            ? `data:image/jpeg;base64,${datamap.get('CD_SCDG2_PHOTO').image}`
            : Config.blankAvatar;

          return (
            <div className="photoContainer">
              <span className="shadow">
                <div
                  className="photoContainer--photo medium"
                  alt="Chip"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </span>
            </div>
          );
        }}
      </ImageConsumer>
    </div>
  );
};

export default ChipImage;
