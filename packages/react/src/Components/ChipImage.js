import React from 'react'

// Local imports
import { ImageConsumer } from './ImageContext'
import './Controller.css'
import Config from './Config'

const ChipImage = () => {
  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer >{ fullPage => {
          
          const datamap = new Map(fullPage);
          const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Chip" className="responsive" />

          if (datamap.has("CD_IMAGEVIS")) {
            let docdata = datamap.get("CD_IMAGEVIS");
            return (<Picture data={docdata.image}/>);
          } else {
            return (<img src={ Config.blankAvatar } alt="Place holder" className="responsive" />);
          }
        }}
        </ImageConsumer>
      </div>
    </div>
  );
}

export default ChipImage