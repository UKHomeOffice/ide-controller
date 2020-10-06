// Global imports
import React from 'react';

// Local imports
import { Button } from '../Atoms';
import { Header } from '../Organisms';
import {
  MainSection,
  MatchValue,
  ImageComparisionsTable,
  DataReadTable,
} from '../Molecules';
import { Column, Row } from '../Layout';

const Index = () => (
  <>
    <Header />
    <div className="govuk-width-container">
      <main
        className="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
        role="main"
      >
        <Row>
          <Column size="one-quarter">
            <MatchValue />
            <ImageComparisionsTable />
            <hr className="govuk-section-break govuk-section-break--m" />
            <DataReadTable />
            <p>
              This data will automatically be deleted when another document is
              scanned or after 15 minutes.
            </p>
            <Button buttonVariant="warning">Clear Data Now</Button>
          </Column>
          <Column size="three-quarters">
            <MainSection />
          </Column>
        </Row>
      </main>
    </div>
  </>
);

export default Index;
