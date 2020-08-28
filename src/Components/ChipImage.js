import React, { useContext } from 'react'

// Local imports
import { DocumentContext } from '../App'
import './Controller.css'
import Config from './Config'



const ChipImage = () => {

  const fullPage = useContext(DocumentContext)
  const datamap = new Map(fullPage);
  const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Chip" className="responsive" />

  if (datamap.has("CD_SCDG2_PHOTO")) {
    let docdata = datamap.get("CD_SCDG2_PHOTO");
    const imageOut = <Picture data={docdata.image}/>;
  } else {
    const imageOut = <img src={ Config.blankAvatar } alt="Place holder" className="responsive" />;
  }

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <imageOut />
      </div>
    </div>
  );
}

export default ChipImage