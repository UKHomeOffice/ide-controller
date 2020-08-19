import React, { Component } from 'react'
import PhotoPanel from './PhotoPanel'

class PhotoColumn extends Component {
  render() {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <div class="photoContainer">
            <PhotoPanel />
          </div>
        </div>
        <div className="govuk-grid-column-one-third">
          <div class="photoContainer">
            <PhotoPanel />
          </div>
        </div>
        <div className="govuk-grid-column-one-third">
          <div class="photoContainer">
            <PhotoPanel />
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoColumn

