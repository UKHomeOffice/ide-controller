// Global imports
import React from 'react';

// Local imports
import InfoTable from './InfoTable';
import MatchValue from './MatchValue';
import InfoTabs from './InfoTabs';

const PageBody = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <div className="govuk-grid-column-one-quarter-from-desktop">
          <MatchValue />
          <InfoTable />
        </div>
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <InfoTabs />
        </div>
      </main>
    </div>
  );
};

export default PageBody;
