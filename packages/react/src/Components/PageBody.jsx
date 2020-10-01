// Global imports
import React from 'react';

// Local imports
import Button from './Atoms/Button';
import Header from './Header';
import InfoTabs from './InfoTabs';
import { Row } from './Layout';
import MatchTable from './MatchTable';
import MatchValue from './MatchValue';
import ReadTable from './ReadTable';

const PageBody = () => {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
          role="main"
        >
          <Row>
            <div className="govuk-grid-column-one-quarter">
              <MatchValue />
              <MatchTable />
              <hr className="govuk-section-break govuk-section-break--m" />
              <ReadTable />
              <p>
                This data will automatically be deleted when another document is
                scanned or after 15 minutes.
              </p>
              <Button buttonVariant="warning">Clear Data Now</Button>
            </div>
            <div className="govuk-grid-column-three-quarters">
              <InfoTabs />
            </div>
          </Row>
        </main>
      </div>
    </>
  );
};

export default PageBody;
