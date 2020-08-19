import React, { Component } from 'react'
import MatchValue from './MatchValue'
import PhotoColumn from './PhotoColumn'
import PhotoHeaders from './PhotoHeaders'
import InfoTable from './InfoTable'


class PageBody extends Component {
  render() {
    return (
      <div className="gov-width-container">
        <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row"></div>
          <MatchValue />
          <PhotoHeaders />
          <PhotoColumn />
          <InfoTable />
        </main>
      </div>
    )
  }
}

export default PageBody

