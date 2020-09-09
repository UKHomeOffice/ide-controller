// Global imports
import React from 'react';

// Local imports
import MRZTable from './MRZTable';

const MRZPanel = () => {
  return (
    <div 
        class="govuk-tabs__panel" 
        role="tab" 
        aria-labelledby="mrz-data" 
        id="mrz-data"
      >
        <h2 class="govuk-heading-l">
          Data read from chip and MRZ
        </h2>
        <MRZTable />
      </div>
  );
};

export default MRZPanel;