// Global imports
import React from 'react';

// Local imports
import './Controller.css';
import Config from './Config';
import { ImageConsumer } from './ImageContext';

const ChipImage = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <ImageConsumer>
        {(fullPage) => {
          const datamap = new Map(fullPage);
          const imageSrc = datamap.has('CD_IMAGEPHOTO')
            ? `data:image/jpeg;base64,${datamap.get('CD_IMAGEPHOTO').image}`
            : Config.blankAvatar;

          return <img src={imageSrc} alt="Chip" className="picture-box" />;
        }}
      </ImageConsumer>
    </div>
  );
};

export default ChipImage;
