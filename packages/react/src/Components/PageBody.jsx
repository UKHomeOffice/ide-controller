// Global imports
import React from 'react';

// Local imports
import InfoTable from './InfoTable';
import MatchValue from './MatchValue';
// import PhotoColumn from './PhotoColumn';
// import PhotoHeaders from './PhotoHeaders';
import InfoTabs from './InfoTabs';

const PageBody = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div class='govuk-grid-row'>
          <div class="govuk-grid-column-one-quarter">
            <MatchValue />
            <InfoTable />
          </div>
          <div class="govuk-grid-column-three-quarters">
            <InfoTabs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageBody;
