// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from './ImageContext';
import Config from './Config';
import './Controller.css';

const ChipImage = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer>
          {(fullPage) => {
            const datamap = new Map(fullPage);
            if (datamap.has('CD_IMAGEVIS')) {
              const docdata = datamap.get('CD_IMAGEVIS');
              return (
                <img
                  src={`data:image/jpeg;base64,${docdata.image}`}
                  alt="Chip"
                  className="responsive"
                />
              );
            }
            return (
              <img
                src={Config.blankAvatar}
                alt="Place holder"
                className="responsive"
              />
            );
          }}
        </ImageConsumer>
      </div>
    </div>
  );
};

export default ChipImage;
