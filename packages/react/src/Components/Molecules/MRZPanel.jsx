// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import MRZTable from './MRZTable';
import { Column, Row } from '../Layout';

const MRZPanel = ({ isActive }) => (
  <div
    className={`govuk-tabs__panel ${
      isActive ? '' : 'govuk-tabs__panel--hidden'
    }`}
    role="tabpanel"
    aria-labelledby="mrz-data"
  >
    <Row>
      <Column size="full">
        <h2 className="govuk-heading-l">Data read from chip and MRZ</h2>
      </Column>
    </Row>
    <MRZTable />
  </div>
);

MRZPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default MRZPanel;
