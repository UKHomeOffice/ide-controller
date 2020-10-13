// Global imports
import React from 'react';

// Local imports
import { Column, Row } from '../Layout';

const PhotoHeaders = () => (
  <Row>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Chip Photo</h2>
    </Column>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Document photo</h2>
    </Column>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Live photo</h2>
    </Column>
  </Row>
);

export default PhotoHeaders;
