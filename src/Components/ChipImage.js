import React, { useContext } from 'react'

// Local imports
import { DocumentContext } from '../App'
import Config from './Config'
import './Controller.css'

const ChipImage = () => {

  const fullPage = useContext(DocumentContext)
  const defaultImage = <img src={ Config.blankAvatar1 } alt="Place holder" className="responsive" />
  
  const Picture = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="Chip" className="responsive" />

  const outImage = fullPage.CD_SCDG2_PHOTO ? <Picture data={fullPage.CD_SCDG2_PHOTO}/> : defaultImage;

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        {outImage}
      </div>
    </div>
  );
}

export default ChipImage