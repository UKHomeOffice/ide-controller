import React from 'react'
import { ImageConsumer } from './ImageContext'
import './Controller.css';

var cd_photo;

export default function ChipImage(props) {

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <ImageConsumer >{ fullPage => {
          
          const datamap = new Map(fullPage);
          const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Document scan" className="responsive" />

          if (datamap.has("CD_IMAGEVIS")) {
            let docdata = datamap.get("CD_IMAGEVIS");
            cd_photo = docdata.image;
          }

          console.log(fullPage)

          if (!cd_photo) {
            return (<img src={ require('./images/defaultImage.svg') } alt="Place holder" className="responsive" />);
          } else {
            return (<Picture data={cd_photo}/>);}
          }
        }
        </ImageConsumer>
      </div>
    </div>
  );
}