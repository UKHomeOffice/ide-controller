import React from 'react';
import {logger} from "react-native-logs";

const log = logger.createLogger();

function Photo(props) {
    return (
        <div className="govuk-grid-column-one-third">
            <p>Hello {props.text}</p>
            <p>-- {props.event}</p>
        </div>
    );
}

export default function PhotoPanel(props) {
    return (
        <div className="govuk-grid-row">
            <p>Test {props.text}</p>
            <Photo event={props.event} text={"Hello Rich!"}/>
            <Photo/>
            <Photo/>
        </div>);
}