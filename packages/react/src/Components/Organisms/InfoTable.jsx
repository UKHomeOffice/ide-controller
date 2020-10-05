// Global imports
import React from 'react';

// Local imports
import { TableRow } from '../Atoms';
import { Column, Row } from '../Layout';

const InfoTable = () => (
  <Row>
    <Column size="full">
      <h2 className="govuk-heading-m">Further information</h2>
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <TableRow rowLabel="Automated checks" type="header" />
        </thead>
        <tbody className="govuk-table__body">
          <TableRow rowLabel="Live to chip" status="Pending Document" />
          <TableRow rowLabel="Live to document" status="Pending Document" />
          <TableRow rowLabel="Chip to document" status="Pending Document" />
          <TableRow rowLabel="Chip data" status="Pending Document" />
          <TableRow rowLabel="MRZ data" status="Pending Document" />
        </tbody>
      </table>
    </Column>
  </Row>
);

export default InfoTable;
