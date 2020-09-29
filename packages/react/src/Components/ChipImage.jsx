// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from './ImageContext';
import ImageCard from './Molecules/ImageCard';
import Config from './Config';
import './Controller.scss';
import Column from './Layout/Column';

const constructImageURL = (base64) => `data:image/jpeg;base64,${base64}`;

const ChipImage = () => {
  return (
    <Column size="one-third padding-5">
      <ImageConsumer>
        {(fullPage) => {
          const datamap = new Map(fullPage);
          if (datamap.has('CD_IMAGEVIS')) {
            const docdata = datamap.get('CD_IMAGEVIS');
            return (
              <ImageCard
                image={constructImageURL(docdata.image)}
                imageAlt="Chip"
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

export default ChipImage;
