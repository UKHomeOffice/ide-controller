import React from 'react'
import { ImageConsumer } from './ImageContext'
import './Controller.css';

var cd_photo;

export default function PhotoPanel(props) {

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer >{ fullPage => {
          
          const datamap = new Map(fullPage);
          const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Place holder" className="responsive" />

          if (datamap.has("CD_IMAGEPHOTO")) {
            let docdata = datamap.get("CD_IMAGEPHOTO");
            cd_photo = docdata.image;
          }

          console.log(fullPage)

          if (!cd_photo) {
            return (<img src={ require('./images/defaultImage.svg') } alt="Document scan" className="responsive" />);
          } else {
            return (<Picture data={cd_photo}/>);}
          }
        }
        </ImageConsumer>
      </div>
    </div>
  );
}