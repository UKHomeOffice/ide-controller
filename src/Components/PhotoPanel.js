import React from 'react';

function Photo(props) {
    return (
        <div className="govuk-grid-column-one-third">
            <p>-- {props.event}</p>
        </div>
    );
}

export default function PhotoPanel(props) {
    return (
        <div className="govuk-grid-row">
            <Photo event={props.event}/>
            <Photo/>
            <Photo/>
        </div>);
}