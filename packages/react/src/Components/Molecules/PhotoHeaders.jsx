// Global imports
import React from 'react';

// Local imports
import { Column, Row } from '../Layout';

const PhotoHeaders = () => (
  <Row>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Chip image</h2>
    </Column>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Document image</h2>
    </Column>
    <Column size="one-third">
      <h2 className="govuk-heading-l">Camera image</h2>
    </Column>
  </Row>
);

export default PhotoHeaders;
