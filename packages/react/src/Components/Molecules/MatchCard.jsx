// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Column } from '../Layout';

const MatchCard = ({ title, value, state }) => {
  return (
    <Column size="one-half">
      <span className="govuk-caption-m">{title}</span>
      <h1 className={`govuk-heading-xl govuk-!-font-size-48 ${state}`}>
        {value}
      </h1>
    </Column>
  );
};

MatchCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default MatchCard;
