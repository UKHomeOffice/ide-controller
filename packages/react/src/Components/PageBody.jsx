// Global imports
import React from 'react';

// Local imports
import Button from './Atoms/Button';
import Header from './Header';
import InfoTable from './InfoTable';
import InfoTabs from './InfoTabs';
import MatchValue from './MatchValue';
import MatchState from './MatchState';
import { Row } from './Layout';

const PageBody = () => {
  return (
    <>
      <Header />
      {/* <div className="govuk-width-container body-width"> */}
      <main className="govuk-main-wrapper" role="main">
        <div className="govuk-grid-column-one-quarter-from-desktop">
          <Row>
            <MatchState />
            <MatchValue />
          </Row>
          <InfoTable />
          <p>
            This data will automatically be deleted when another document is
            scanned or after 15 minutes.
          </p>
          <Button buttonVariant="warning">Clear Data Now</Button>
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
