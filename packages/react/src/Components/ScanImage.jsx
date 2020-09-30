// Global imports
import React from 'react';
import Config from './Config';

// Local imports
import './Controller.scss';
import { ImageConsumer } from './ImageContext';
import { Column } from './Layout';
import ImageCard from './Molecules/ImageCard';

const constructImageURL = (base64) => `data:image/jpeg;base64,${base64}`;

const PhotoPanel = () => {
  return (
    <Column size="one-third padding-5">
      <ImageConsumer>
        {(fullPage) => {
          const datamap = new Map(fullPage);

          if (datamap.has('CD_IMAGEPHOTO')) {
            const docdata = datamap.get('CD_IMAGEPHOTO');
            return (
              <ImageCard
                image={constructImageURL(docdata.image)}
                imageAlt="Scan"
              />
            );
          }
          return (
            <ImageCard image={Config.blankAvatar} imageAlt="Place holder" />
          );
        }}
      </ImageConsumer>
    </Column>
  );
};

export default PhotoPanel;
