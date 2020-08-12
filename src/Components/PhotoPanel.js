import React from 'react';

function Photo(props) {
    return (
        <div className="govuk-grid-column-one-third">
            <p>govuk-grid-column-one-third</p>
        </div>
    );
}

export default function PhotoPanel(props) {
    return (
        <div className="govuk-grid-row">
            <Photo/>
            <Photo/>
            <Photo/>
        </div>);
}