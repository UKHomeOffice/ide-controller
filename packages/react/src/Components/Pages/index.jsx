// Global imports
import React from 'react';

// Local imports
import { Button } from '../Atoms';
import { Header } from '../Organisms';
import InfoTable from '../Organisms/InfoTable';
import InfoTabs from '../Molecules/InfoTabs';
import MatchValue from '../Molecules/MatchValue';
import { Column } from '../Layout';

const Index = () => (
  <>
    <Header />
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
  </>
);

export default Index;
