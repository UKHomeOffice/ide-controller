import React from 'react'
import { ImageConsumer } from './ImageContext'
import './Controller.css';

export default function ChipImage(props) {

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer >{ fullPage => {
          
          const datamap = new Map(fullPage);
          const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Document scan" className="responsive" />

          if (datamap.has("CD_SCDG2_PHOTO")) {
            var docdata = datamap.get("CD_SCDG2_PHOTO");
          }

          console.log(fullPage)

          if (!docdata) {
            return (<img src={ require('./images/defaultImage.svg') } alt="Place holder" className="responsive" />);
          } else {
            return (<Picture data={docdata.image}/>);}
          }
        }
        </ImageConsumer>
      </div>
    </div>
  );
}