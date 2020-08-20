import React, { Component } from 'react'
import PhotoPanel from './PhotoPanel'

class PhotoColumn extends Component {
  render() {
    return (
      <div className="govuk-grid-row">
          <PhotoPanel />
          <PhotoPanel />
          <PhotoPanel />
      </div>
    )
  }
}

export default PhotoColumn

