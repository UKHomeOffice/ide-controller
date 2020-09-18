// Global imports
import React from 'react';

// Local imports
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';
import ScanImage from './ScanImage';

// eslint-disable-next-line react/prop-types
const ImagePanel = ({ isActive }) => {
  return (
    <div
      className={`govuk-tabs__panel ${
        isActive ? '' : 'govuk-tabs__panel--hidden'
      }`}
      role="tabpanel"
      aria-labelledby="image-data"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Images to compare</h2>
        </div>
      </div>
      <PhotoHeaders />
      <div className="govuk-grid-row">
        <ChipImage />
        <ScanImage />
        <LiveImage />
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p />
        </div>
        <div className="govuk-grid-column-one-third">
          <button
            className="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            style={{ margin: '1em 0 0 0' }}
            type="button"
          >
            Retake photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;
