// Global imports
import React from 'react';

// Local imports
import GovButton from './Atoms/GovButton';

const ClearButton = () => {
  return (
    <GovButton 
      buttonText="Clear Data Now" 
      buttonVariant="warning" 
      buttonType="button"/>
  );
};

export default ClearButton;
