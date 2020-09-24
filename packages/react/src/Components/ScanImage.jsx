// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from './ImageContext';
import Config from './Config';
import './Controller.css';

const ScanImage = () => {
  return (
    <div className="govuk-grid-column-one-third image-padding">
      <ImageConsumer>
        {(fullPage) => {
          const datamap = new Map(fullPage);
          const image = datamap.has('CD_IMAGEPHOTO')
            ? `data:image/jpeg;base64,${datamap.get('CD_IMAGEPHOTO').image}`
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

export default ScanImage;
