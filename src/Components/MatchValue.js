import React, { Component } from 'react'

class MatchValue extends Component {
  render() {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="govuk-caption-xl">
            Facial likeness between these photos
          </span>
          <h1 className="govuk-heading-xl govuk-!-font-size-80 fail">
            Pass 55%
          </h1>
        </div>
      </div>
    )
  }
}

export default MatchValue
