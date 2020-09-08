// Global imports
import React from 'react';

// Local imports
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import ScanImage from './ScanImage';

const PhotoColumn = () => {
  return (
    <div class="govuk-tabs" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">
        Images to compare
      </h2>
      <div className="govuk-grid-row">

      </div>
        <div class="govuk-tabs__panel" id="past-day">
        <h2 class="govuk-heading-l">Images to compare</h2>
        <table class="govuk-table">
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header">Chip image</th>
              <th scope="col" class="govuk-table__header">Document image</th>
              <th scope="col" class="govuk-table__header">Live image</th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <ChipImage />
              <ScanImage />
              <LiveImage />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhotoColumn;
