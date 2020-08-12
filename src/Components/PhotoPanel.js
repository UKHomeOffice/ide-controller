import React from 'react';

function Photo(props) {
    return (
        <div className="govuk-grid-column-one-third">
            <p>Type {props.type}</p>
            <p>Event {props.event}</p>
            <p>Length {props.length}</p>
        </div>
    );
}

export default function PhotoPanel(props) {
    return (
        <div className="govuk-grid-row">
            <Photo type={props.state.dataType} event={props.state.event} length={props.state.dataLength}/>
            <Photo length={props.state.dataLength}/>
            <Photo/>
        </div>);
}