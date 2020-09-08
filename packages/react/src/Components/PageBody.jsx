// Global imports
import React from 'react';

// Local imports
import InfoTable from './InfoTable';
import MatchValue from './MatchValue';
import InfoTabs from './InfoTabs';

const PageBody = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className='govuk-grid-row'>
          <div className="govuk-grid-column-one-quarter">
            <MatchValue />
            <InfoTable />
          </div>
          <div className="govuk-grid-column-three-quarters">
            <InfoTabs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageBody;
