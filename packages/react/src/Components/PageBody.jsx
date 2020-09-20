// Global imports
import React from 'react';

// Local imports
import ClearButtonSection from './ClearButtonSection';
import Header from './Header';
import InfoTable from './InfoTable';
import InfoTabs from './InfoTabs';
import MatchValue from './MatchValue';

const PageBody = () => {
  return (
    <>
      <Header />
      {/* <div className="govuk-width-container body-width"> */}
      <main className="govuk-main-wrapper" role="main">
        <div className="govuk-grid-column-one-quarter-from-desktop">
          <MatchValue />
          <InfoTable />
          <ClearButtonSection />
        </div>
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <InfoTabs />
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export default PageBody;
