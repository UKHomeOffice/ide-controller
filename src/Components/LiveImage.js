import React from 'react'

// Local imports
import './Controller.css';
import Config from './Config'

const LiveImage = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <img src={ Config.blankAvatar1 } alt="Place holder" className="responsive" />
      </div>
    </div>
  );
}

export default LiveImage