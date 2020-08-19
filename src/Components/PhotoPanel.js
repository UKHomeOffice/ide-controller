import React from 'react';
import { logger } from 'react-native-logs';
import DocumentData from '../Types/DocumentData'

const log = logger.createLogger();

var cd_photo;

function Photo(props) {
  const data = props.data;
  const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

  if (data != null) {
    return (
    <div className="govuk-grid-column-one-third">
      <Example data={data} />
    </div>
    );
  } else {
    return (<img src={ require('./images/defaultImage.svg') } resizeMode="contain" />);
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
    <div class="photoContianer--frame">
      <span class="shadow">
        <div class="photoContainer--photo medium at6">
          <Photo data={cd_photo} />
        </div>
      </span>
    </div>);
}


