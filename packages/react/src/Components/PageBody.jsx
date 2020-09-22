// Global imports
import React from 'react';

// Local imports
import Button from './Atoms/Button';
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
          <p>
            This data will automatically be deleted when another document is
            scanned or after 15 minutes.
          </p>
          <Button buttonText="Clear Data Now" buttonVariant="warning" />
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
