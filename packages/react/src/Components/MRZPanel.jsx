// Global imports
import React from 'react';

// Local imports
import MRZTable from './MRZTable';

const MRZPanel = () => {
  return (
    <div 
        class="govuk-tabs__panel govuk-tabs__panel--hidden" 
        role="tabpanel" 
        aria-labelledby="mrz-data" 
        id="mrz-data"
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">
              Data read from chip and MRZ
            </h2>
          </div>
        </div>
        <MRZTable />
      </div>
  );
};

export default MRZPanel;