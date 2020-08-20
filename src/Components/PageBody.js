import React, { Component } from 'react'
import MatchValue from './MatchValue'
import PhotoColumn from './PhotoColumn'
import PhotoHeaders from './PhotoHeaders'
import InfoTable from './InfoTable'


class PageBody extends Component {
  render() {
    return (
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
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

