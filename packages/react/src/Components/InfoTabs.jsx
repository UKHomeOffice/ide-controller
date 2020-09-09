// Global imports
import React from 'react';

// Local imports
import MRZPanel from './MRZPanel';
import ImagePanel from './ImagePanel';

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
      <ImagePanel/>
      <MRZPanel/>
  </div>
  );
};

export default InfoTabs;