// Global imports
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

// Local imports
import { Column, Row } from '../Layout';
import { Button } from '../Atoms';
import { ConfigContext } from '../Context/Config';

const ConfigurationsPanel = ({ isActive }) => {
  const { setConfigContext } = useContext(ConfigContext);
  const setAccuracyLevel = (level) => {
    setConfigContext({ allowedTiltPixels: level });
  };
  return (
    <div
      className={`govuk-tabs__panel ${
        isActive ? '' : 'govuk-tabs__panel--hidden'
      }`}
      role="tabpanel"
      aria-labelledby="mrz-data"
    >
      <Row>
        <Column size="full">
          <h2 className="govuk-heading-l">Configurations</h2>
          <h3>Select camera algorithm accuracy level</h3>
        </Column>
      </Row>
      <Row>
        <Column size="one-quarter">
          <Button onClick={() => setAccuracyLevel(20)} buttonVariant="primary">
            Low
          </Button>
        </Column>
        <Column size="one-quarter">
          <Button onClick={() => setAccuracyLevel(5)} buttonVariant="primary">
            Medium
          </Button>
        </Column>
        <Column size="one-quarter">
          <Button onClick={() => setAccuracyLevel(2)} buttonVariant="primary">
            High
          </Button>
        </Column>
      </Row>
    </div>
  );
};

ConfigurationsPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ConfigurationsPanel;
