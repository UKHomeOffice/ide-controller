// Global imports
import React from 'react';

// Local imports
import { Button } from '../Atoms';
import { Header } from '../Organisms';
import { MainSection, MatchCard, MatchTable, ReadTable } from '../Molecules';
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
            <Row>
              <MatchCard title="Result" value="No data" state="neutral" />
              <MatchCard title="Score" value="No data" state="neutral" />
            </Row>
            <MatchTable />
            <hr className="govuk-section-break govuk-section-break--m" />
            <ReadTable />
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
