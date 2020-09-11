// Global imports
import React, { useState } from 'react';

// Local imports
import MRZPanel from './MRZPanel';
import ImagePanel from './ImagePanel';

const InfoTabs = () => {

  const [stateTab, setStateTab] = useState({
    imagePanel: true,
    MRZPanel: false,
  });

  const clickedTab = (panel) => {
    return panel ? "govuk-tabs__list-item govuk-tabs__list-item--selected" : "govuk-tabs__list-item";
  }

  return (
		<div className="govuk-tabs" data-module="govuk-tabs">
      <ul className="govuk-tabs__list" role="tablist">
        <li
          className={ clickedTab(stateTab.imagePanel) }
          role="presentation"
        >
          <a
            className="govuk-tabs__tab"
            href="#image-tab"
            onClick={() => setStateTab({
              imagePanel: true,
              MRZPanel: false,
              })
          }
          >
            Images to compare
          </a>
        </li>
        <li 
          className={ clickedTab(stateTab.MRZPanel) } 
          role="presentation"
        >
          <a
            className="govuk-tabs__tab"
            href="#mrz-tab"
            onClick={() => setStateTab({
              imagePanel: false,
              MRZPanel: true,
            })
          }
          >
            Data read from chip and MRZ
          </a>
        </li>
      </ul>
      <ImagePanel isActive={stateTab.imagePanel}/>
      <MRZPanel isActive={stateTab.MRZPanel}/>
    </div>
  );
};

export default InfoTabs;
