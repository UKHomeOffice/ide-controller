// Global imports
import React from 'react';

// Local imports
import ChipImage from './ChipImage';
import LiveImage from './LiveImage';
import ScanImage from './ScanImage';
import PhotoHeaders from './PhotoHeaders'

const InfoTabs = () => {
  return (
		<div class="govuk-tabs" data-module="govuk-tabs">
			<h2 class="govuk-tabs__title">Contents</h2>
      <ul class="govuk-tabs__list" role="tablist">
        <li class="govuk-tabs__list-item" role="presentation">
          <a 
            class="govuk-tabs__tab" 
            href="#image-data"
            id="tab_image-data"
            role="tab"
            aria-controls="image-data"
            aria-selected="true"
            tabIndex="0"
          >
            Images to compare
          </a>
        </li>
        <li class="govuk-tabs__list-item">
          <a 
            class="govuk-tabs__tab" 
            href="#mrz-data"
            id="tab_mrz-data"
            aria-controls="mrz-data"
            aria-selected="false"
            tabindex="-1"
          >
            Data read from chip and MRZ
          </a>
        </li>
      </ul>

      <div 
        class="govuk-tabs__panel"
        role="tab" 
        aria-labelledby="image-data" 
        id="image-data"
      >
        <h2 class="govuk-heading-l">Images to compare</h2>
          <div class="govuk-grid-row">
            <PhotoHeaders />
          </div>
          <div class="govuk-grid-row">
            <ChipImage />
            <ScanImage />
            <LiveImage />
          </div>      
      </div>
      
      <div 
        class="govuk-tabs__panel govuk-tabs__panel--hidden" 
        role="tab" 
        aria-labelledby="mrz-data" 
        id="mrz-data"
      >
        <h2 class="govuk-heading-l">
          Data read from chip and MRZ
        </h2>
        <table class="govuk-table">
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header"/>
              <th scope="col" class="govuk-table__header">Read from chip</th>
              <th scope="col" class="govuk-table__header">Read from MRZ</th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <th class="govuk-table__cell">Document number</th>
              <td class="govuk-table__cell">No chip</td>
              <td class="govuk-table__cell">No Data</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__cell">Document expiry date</th>
              <td class="govuk-table__cell">No chip</td>
              <td class="govuk-table__cell">No Data</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__cell">Document type</th>
              <td class="govuk-table__cell">No chip</td>
              <td class="govuk-table__cell">No Data</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__cell">Document issuer</th>
              <td class="govuk-table__cell">No chip</td>
              <td class="govuk-table__cell">No Data</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__cell">MRZ</th>
              <td class="govuk-table__cell">No chip</td>
              <td class="govuk-table__cell">No Data</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  );
};

export default InfoTabs;