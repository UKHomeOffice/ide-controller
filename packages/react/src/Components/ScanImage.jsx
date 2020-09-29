// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from './ImageContext';
import Image from './Atoms/Image';
import Config from './Config';
import './Controller.scss';

const PhotoPanel = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer>
          {(fullPage) => {
            const datamap = new Map(fullPage);

            if (datamap.has('CD_IMAGEPHOTO')) {
              const docdata = datamap.get('CD_IMAGEPHOTO');
              return (
                <Image
                  image={`data:image/jpeg;base64,${docdata.image}`}
                  imageAlt="Scan"
                />
              );
            }
            return <Image image={Config.blankAvatar} imageAlt="Place holder" />;
          }}
        </ImageConsumer>
      </div>
    </div>
  );
};

export default PhotoPanel;
