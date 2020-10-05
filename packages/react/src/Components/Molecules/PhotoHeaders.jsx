// Global imports
import React from 'react';

// Local imports
import { Row } from '../Layout';

const PhotoHeaders = () => {
  return (
    <Row>
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Chip Photo</h2>
      </div>
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Document photo</h2>
      </div>
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Live photo</h2>
      </div>
    </Row>
  );
};

export default PhotoHeaders;
