import React from 'react';

// Local imports
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import ScanImage from './ScanImage';

const PhotoColumn = () => {
  return (
    <div className="govuk-grid-row">
      <ChipImage />
      <ScanImage />
      <LiveImage />
    </div>
  );
};

export default PhotoColumn;
