// Global imports
import React from 'react';

// Local imports
import Video from './Video';
import './Controller.css';

const LiveImage = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <Video />
      </div>
    </div>
  );
};

export default LiveImage;
