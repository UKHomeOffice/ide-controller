// Global imports
import React, { useState } from 'react';

// Local imports
import ImagePanel from './ImagePanel';
import MRZPanel from './MRZPanel';
import ConfigurationsPanel from './ConfigurationsPanel';

const MainSection = () => {
  const [active, setActiveState] = useState({
    imagePanel: true,
    MRZPanel: false,
    configurationsPanel: false,
  });

  const setActive = (panelName) => {
    setActiveState({
      imagePanel: false,
      MRZPanel: false,
      configurationsPanel: false,
      [panelName]: true,
    });
  };

  return (
    <div className="govuk-tabe" data-module="govuk-tabs">
      <ul className="govuk-tabs__list" role="tablist">
        <li
          className={`
            govuk-tabs__list-item
            ${active.imagePanel ? ' govuk-tabs__list-item--selected' : ''}`}
          role="presentation"
        >
          <a
            className="govuk-tabs__tab font--19pt"
            href="#image-tab"
            onClick={() => setActive('imagePanel')}
          >
            Images to compare
          </a>
        </li>
        <li
          className={`
            govuk-tabs__list-item
            ${active.MRZPanel ? ' govuk-tabs__list-item--selected' : ''}`}
          role="presentation"
        >
          <a
            className="govuk-tabs__tab font--19pt"
            href="#image-tab"
            onClick={() => setActive('MRZPanel')}
          >
            Data read from chip and MRZ
          </a>
        </li>
        <li
          className={`
            govuk-tabs__list-item
            ${active.MRZPanel ? ' govuk-tabs__list-item--selected' : ''}`}
          role="presentation"
        >
          <a
            className="govuk-tabs__tab font--19pt"
            href="#image-tab"
            onClick={() => setActive('configurationsPanel')}
          >
            Configurations
          </a>
        </li>
      </ul>
      <ImagePanel isActive={active.imagePanel} />
      <MRZPanel isActive={active.MRZPanel} />
      <ConfigurationsPanel isActive={active.configurationsPanel} />
    </div>
  );
};

export default MainSection;
