// Global imports
import React from 'react';

// Local imports
import { Button } from '../Atoms';
import { Column, Row } from '../Layout';
import {
  DataReadTable,
  ImageComparisonsTable,
  MainSection,
  MatchValue,
} from '../Molecules';
import { Header } from '../Organisms';

const Index = () => (
  <>
    <Header />
    <main
      className="govuk-width-container govuk-width-container--align-centre"
      role="main"
    >
      <Row>
        <Column size="one-quarter">
          <MatchValue />
          <ImageComparisonsTable />
          <hr className="govuk-section-break govuk-section-break--m" />
          <DataReadTable />
          <p className="govuk-body font--26">
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
  </>
);

export default Index;
