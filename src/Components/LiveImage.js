import React from 'react'
import './Controller.css';

export default function LiveImage(props) {

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <img src={ require('./images/defaultImage.svg') } alt="Document scan" className="responsive" />
      </div>
    </div>
  );
}