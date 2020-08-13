import React from 'react';
import { logger } from 'react-native-logs';
import DocumentData from '../Types/DocumentData'

const log = logger.createLogger();

var cd_photo;

function Photo(props) {
     const data = props.data;
     const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

     return (
         <div className="govuk-grid-column-one-third">
             <Example data={data} />
         </div>
     );
}

export default function PhotoPanel(props) {
    const documentData = props.data;
    const datamap = new Map(props.data);
    
    log.info("Properties data " + props.data);
    if (datamap.has("CD_IMAGEPHOTO")) {
        let docdata = datamap.get("CD_IMAGEPHOTO");
        log.info("PHOTO" + docdata.image);
        cd_photo = docdata.image;
    }

    return (
        <div className="govuk-grid-row">
            {/* <h1>Hello {} </h1> */}
            <Photo data={cd_photo} />
            <Photo/>
            <Photo/>
        </div>);
}