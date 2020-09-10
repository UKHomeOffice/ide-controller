// Global imports
import React from 'react';

// Local imports
import InfoTable from './InfoTable';
import MatchValue from './MatchValue';
// import PhotoColumn from './PhotoColumn';
// import PhotoHeaders from './PhotoHeaders';
import InfoTabs from './InfoTabs';

const PageBody = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className='govuk-grid-row'>
          <div className="govuk-grid-column-one-quarter">
            <MatchValue />
            <InfoTable />
          </div>
          <div className="govuk-grid-column-three-quarters">
            <InfoTabs />
            {/* <div className="govuk-tabs" data-module="govuk-tabs">
              <h2 className="govuk-tabs__title">
                Contents
              </h2>
              <ul className="govuk-tabs__list">
                <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
                  <a className="govuk-tabs__tab" href="#images">
                    Images to compare
                  </a>
                </li>
                <li className="govuk-tabs__list-item">
                  <a className="govuk-tabs__tab" href="#further-information">
                    Data read from chip and MRZ 
                  </a>
                </li>
              </ul>
              <div className="govuk-tabs__panel" id="images">
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-full">
                    <h2 className="govuk-heading-l">Images to compare</h2>
                  </div>
                </div>
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-third">
                    <h2 className="govuk-heading-m">Chip image</h2>
                  </div>
                  <div className="govuk-grid-column-one-third">
                    <h2 className="govuk-heading-m">Document image</h2>
                  </div>
                  <div className="govuk-grid-column-one-third">
                    <h2 className="govuk-heading-m">Camera image</h2>
                  </div>
                </div>
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-third">
                    <div className="photoContainer" id="photoContainer--chip">
                      <div className="photoContainer--frame">
                        <span className="shadow">
                          <div className="photoContainer--photo medium" id="">
                            <h3 className="status status--connected govuk-heading-s">Scanner connected</h3>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="govuk-grid-column-one-third">
                    <div className="photoContainer" id="photoContainer--idDocument">
                      <div className="photoContainer--frame">
                        <span className="shadow">
                          <div className="photoContainer--photo medium" id="photo--idDocument"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="govuk-grid-column-one-third">
                    <div className="photoContainer" id="photoContainer--liveness">
                      <div className="photoContainer--frame">
                        <span className="shadow">
                          <div className="photoContainer--photo medium" id="photo--liveness"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="further-information">
                <h2 className="govuk-heading-l">Data read from chip and MRZ</h2>
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-full">
                    <table className="govuk-table" style={{marginBottom: "60px"}}>
                      <thead className="govuk-table__head">
                        <tr className="govuk-table__row">
                          <th className="govuk-table__header" scope="col"></th>
                          <th className="govuk-table__header" scope="col">Read from chip</th>
                          <th className="govuk-table__header" scope="col">Read from MRZ</th>
                        </tr>
                      </thead>
                      <tbody className="govuk-table__body">
                        <tr className="govuk-table__row">
                          <th className="govuk-table__cell" scope="row">Document number</th>
                          <td className="govuk-table__cell">No chip</td>
                          <td className="govuk-table__cell">SPECI2014</td>
                        </tr>
                        <tr className="govuk-table__row">
                          <th className="govuk-table__cell" scope="row">Document expiry date</th>
                          <td className="govuk-table__cell">No chip</td>
                          <td className="govuk-table__cell">09/03/2024</td>
                        </tr>
                        <tr className="govuk-table__row">
                          <th className="govuk-table__cell" scope="row">Document type</th>
                          <td className="govuk-table__cell">No chip</td>
                          <td className="govuk-table__cell">Passport</td>
                        </tr>
                        <tr className="govuk-table__row">
                          <th className="govuk-table__cell" scope="row">Document issuer</th>
                          <td className="govuk-table__cell">No chip</td>
                          <td className="govuk-table__cell">Netherlands</td>
                        </tr>
                        <tr className="govuk-table__row">
                          <th className="govuk-table__cell" scope="row">MRZ</th>
                          <td className="govuk-table__cell">No chip</td>
                            <td className="govuk-table__cell monospace" style={{fontSize: "14px"}}>
                              P&lt;NLDDE&lt;BRIJN&lt;&lt;WILLEKE&lt;LISELOTTE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>SPECI20142NLD6503101F2403096999999990&lt;&lt;&lt;&lt;&lt;84
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> 
            </div> */}

          </div>
        </div>
      </main>
    </div>
  );
};

export default PageBody;
