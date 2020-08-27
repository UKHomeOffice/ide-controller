import React, { Component } from 'react'
import ScanImage from './ScanImage'
import ChipImage from './ChipImage'
import LiveImage from './LiveImage'

class PhotoColumn extends Component {
  render() {
    return (
      <div className="govuk-grid-row">
            <ChipImage />
            <ScanImage />
            <LiveImage />
      </div>
    )
  }
}

export default PhotoColumn

