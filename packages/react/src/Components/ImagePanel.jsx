// Global imports
import React from 'react';

// Local imports 
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import ScanImage from './ScanImage';
import PhotoHeaders from './PhotoHeaders'


const ImagePanel = () => {
  return (
    <div 
      class="govuk-tabs__panel"
      role="tab" 
      aria-labelledby="image-data" 
      id="image-data"
    >
      <h2 class="govuk-heading-l">
        Images to compare
      </h2>
      <div class="govuk-grid-row">
        <PhotoHeaders />
      </div>
      <div class="govuk-grid-row">
        <ChipImage />
        <ScanImage />
        <ScanImage />
        {/* <LiveImage /> */}
      </div>      
    </div>
  );
};

export default ImagePanel;