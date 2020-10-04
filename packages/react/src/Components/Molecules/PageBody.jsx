// Global imports
import React from 'react';

// Local imports
import { Button } from '../Atoms';
import Header from './Header';
import InfoTable from './InfoTable';
import InfoTabs from './InfoTabs';
import MatchValue from './MatchValue';
import { Column } from '../Layout';

const PageBody = () => {
  return (
    <>
      <Header />
      {/* <div className="govuk-width-container body-width"> */}
      <main className="govuk-main-wrapper" role="main">
        <Column size="one-quarter-from-desktop">
          <MatchValue />
          <InfoTable />
          <p>
            This data will automatically be deleted when another document is
            scanned or after 15 minutes.
          </p>
          <Button buttonVariant="warning">Clear Data Now</Button>
        </Column>
        <Column size="three-quarters-from-desktop">
          <InfoTabs />
        </Column>
      </main>
      {/* </div> */}
    </>
  );
};

export default PageBody;
