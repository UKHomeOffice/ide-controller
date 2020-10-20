// Global imports
import React, { useContext, useEffect } from 'react';

// Local imports
import { Button } from '../Atoms';
import { Column, Row } from '../Layout';
import {
  DataReadTable,
  ImageComparisonsTable,
  MainSection,
  MatchCard,
} from '../Molecules';
import { Header } from '../Organisms';
import {
  EventSourceContext,
  LivePhotoContext,
  ScoreContext,
  StatusContext,
} from '../Context';
import { clearDataTimeout } from '../../config/camera';

let timer;

const Index = () => {
  const { eventSourceContext, setEventSourceContext } = useContext(
    EventSourceContext
  );
  const { livePhotoContext, setLivePhotoContext } = useContext(
    LivePhotoContext
  );
  const { setScoreContext } = useContext(ScoreContext);
  const { setStatusContext } = useContext(StatusContext);

  const emptyAllContext = () => {
    setEventSourceContext({ eventSourceEvent: `RESTART-${Date.now()}` });
    setLivePhotoContext({});
    setScoreContext({});
    setStatusContext({});
  };

  useEffect(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(emptyAllContext, clearDataTimeout);
  }, [eventSourceContext.timestamp, livePhotoContext.timestamp]);

  return (
    <>
      <Header />
      <main
        className="govuk-width-container govuk-width-container--align-centre"
        role="main"
      >
        <Row>
          <Column size="one-quarter">
            <MatchCard />
            <ImageComparisonsTable />
            <hr className="govuk-section-break govuk-section-break--m" />
            <DataReadTable />
            <p className="govuk-body font--16pt">
              This data will automatically be deleted when another document is
              scanned or after 15 minutes.
            </p>
            <Button onClick={() => emptyAllContext()} buttonVariant="warning">
              Clear data immediately
            </Button>
          </Column>
          <Column size="three-quarters">
            <MainSection />
          </Column>
        </Row>
      </main>
    </>
  );
};

export default Index;
