// Global imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Local imports
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';
import ScanImage from './ScanImage';

const ImagePanel = ({ isActive }) => {
  const [restartCam, setRestartCam] = useState(true);
  const restartLiveImage = () => {
    setRestartCam(false);
    setTimeout(() => setRestartCam(true), 0);
  };

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
        {restartCam && <LiveImage restartCam={restartCam} />}
        <button onClick={restartLiveImage} type="button">
          Retake Photo
        </button>
      </div>
    </div>
  );
};

ImagePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ImagePanel;
