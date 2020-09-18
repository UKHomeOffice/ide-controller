// Global imports
import React from 'react';

// Local imports
import ClearData from './ClearData';
import Header from './Header';
import InfoTabs from './InfoTabs';
import MatchTable from './MatchTable';
import MatchValue from './MatchValue';
import ReadTable from './ReadTable';

const PageBody = () => {
  return (
    <body className="govuk-template__body">
      <Header />
      <div className="govuk-width-container" style={{ 'max-width': '95%' }}>
        <main
          className="govuk-main-wrapper govuk-main-wrapper-auto-spacing"
          id="main-content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
              <MatchValue />
              <MatchTable />
              <ReadTable />
              <ClearData />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <InfoTabs />
            </div>
          </div>
        </main>
      </div>
    </body>
  );
};

export default PageBody;
