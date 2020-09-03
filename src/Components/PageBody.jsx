// Global imports
import React from 'react';

// Local imports
import InfoTable from './InfoTable';
import MatchValue from './MatchValue';
import PhotoColumn from './PhotoColumn';
import PhotoHeaders from './PhotoHeaders';

const PageBody = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <MatchValue />
        <PhotoHeaders />
        <PhotoColumn />
        <InfoTable />
      </main>
    </div>
  );
};

export default PageBody;
