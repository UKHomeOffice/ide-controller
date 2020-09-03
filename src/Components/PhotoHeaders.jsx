import React from 'react';

const PhotoHeaders = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Chip Photo</h2>
      </div>
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Document photo</h2>
      </div>
      <div className="govuk-grid-column-one-third">
        <h2 className="govuk-heading-m">Live photo</h2>
      </div>
    </div>
  );
};

export default PhotoHeaders;
