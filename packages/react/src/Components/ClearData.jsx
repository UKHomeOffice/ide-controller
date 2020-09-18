// Global imports
import React from 'react';

const ClearData = () => {
  return (
    <div>
      <p>
        This data will automatically be deleted when another document is scanned
        or after 15 minutes.
      </p>
      <button
        className="govuk-button govuk-button--warning"
        data-module="govuk-button"
        type="button"
      >
        Clear Data Now
      </button>
    </div>
  );
};

export default ClearData;
