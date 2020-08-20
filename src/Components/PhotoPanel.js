import React from 'react';
import './Controller.css';
import { logger } from 'react-native-logs';
import DocumentData from '../Types/DocumentData'

const log = logger.createLogger();

var cd_photo;

function Photo(props) {
  const data = props.data;
  const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Doc Scan" className="responsive" />

  console.log(data)

  if (data === undefined) {
    return (<img src={ require('./images/defaultImage.svg') } className="responsive" />);
  } else {
    return (
      <div className="govuk-grid-column-one-third">
        <Picture data={data} />
      </div>
    );
  }
}

export default function PhotoPanel(props) {
  const DocumentData = props.data;
  const datamap = new Map(props.data);

  log.info("Properties data " + props.data);
  if (datamap.has("CD_IMAGEPHOTO")) {
    let docdata = datamap.get("CD_IMAGEPHOTO");
    cd_photo = docdata.image;
  }

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <Photo data={cd_photo} />
      </div>
    </div>
);
}


