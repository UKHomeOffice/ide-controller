// Global imports
import React, { useState } from 'react';

// Local imports
import ImagePanel from './ImagePanel';
import MRZPanel from './MRZPanel';

const MainSection = () => {
  const [active, setActive] = useState({
    imagePanel: true,
    MRZPanel: false,
  });

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
            className="govuk-tabs__tab font--26"
            href="#image-tab"
            onClick={() => setActive({ imagePanel: true, MRZPanel: false })}
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
            className="govuk-tabs__tab font--26"
            href="#image-tab"
            onClick={() => setActive({ imagePanel: false, MRZPanel: true })}
          >
            Data read from chip and MRZ
          </a>
        </li>
      </ul>
      <ImagePanel isActive={active.imagePanel} />
      <MRZPanel isActive={active.MRZPanel} />
    </div>
  );
};

export default MainSection;
