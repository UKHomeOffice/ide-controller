// Global imports
import React from 'react';

// Local imports 
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import ScanImage from './ScanImage';
import PhotoHeaders from './PhotoHeaders'


const ImagePanel = ({ isActive }) => {

  console.log(isActive)

  return (
    <div 
      className={`
          govuk-tabs__panel
          ${isActive ? '' : 'govuk-tabs__panel--hidden'}`}
      role="tabpanel" 
      aria-labelledby="image-data" 
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">
            Images to compare
          </h2>
        </div>
      </div>
      <PhotoHeaders />
      <div className="govuk-grid-row">
        <ChipImage />
        <ScanImage />
        <LiveImage />
      </div>      
    </div>
  );
};

export default ImagePanel;
