// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Column, Row } from '../Layout';

const ConfigurationsPanel = ({ isActive }) => (
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
      </Column>
    </Row>
    <Row>
      <Column>1</Column>
      <Column>2</Column>
      <Column>3</Column>
    </Row>
  </div>
);

ConfigurationsPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ConfigurationsPanel;
