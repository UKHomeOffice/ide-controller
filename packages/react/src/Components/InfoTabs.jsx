// Global imports
import React from 'react';

// Local imports
import MRZPanel from './MRZPanel';
import ImagePanel from './ImagePanel';

const InfoTabs = () => {
  return (
		<div className="govuk-tabs" data-module="govuk-tabs">
      <h2 className="govuk-tabs__title">
        Contents
      </h2>
      <ul className="govuk-tabs__list" role="tablist">
        <li className="govuk-tabs__list-item govuk-tabs__list-item--selected" role="presentation">
          <a 
            className="govuk-tabs__tab" 
            href="#image-data"
          >
            Images to compare
          </a>
        </li>
        <li className="govuk-tabs__list-item" role="presentation">
          <a 
            className="govuk-tabs__tab" 
            href="#mrz-data"
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
