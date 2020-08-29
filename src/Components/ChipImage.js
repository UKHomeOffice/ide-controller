import React, { useContext } from "react";
import {ColorContext} from "../App";

// Local imports
import { ImageConsumer } from './ImageContext'
import './Controller.css'
import Config from './Config'
import App from "../App";

const ChipImage = () => {
    console.log('Hi');
    const colors = useContext(ColorContext);
  return (
    <div className="govuk-grid-column-one-third">
        <h2>{colors.blue}</h2>
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