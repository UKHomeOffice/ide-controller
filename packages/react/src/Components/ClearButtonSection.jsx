// Global imports
import React from 'react';

// Local imports
import ClearButton from './ClearButton';

const ClearButtonSection = () => {
  return (
    <>
      <p>
        This data will automatically be deleted when another document is scanned
        or after 15 minutes.
      </p>
      <ClearButton />
    </>
  );
};

export default ClearButtonSection;
