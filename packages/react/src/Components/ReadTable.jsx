// Global imports
import React from 'react'

const ReadTable = () => {
  return (
    <table class="govuk-table">
			<caption class="govuk-table__caption">Data read</caption>
			<thead class="govuk-table__head">
				<tr class="govuk-table__row">
					<th class="govuk-table__header govuk-visually-hidden govuk-!-width-one-half" scope="col">Data source</th>
					<th class="govuk-table__header govuk-visually-hidden govuk-!-width-one-half" scope="col">Read result</th>
				</tr>
			</thead>
			<tbody class="govuk-table__body">
				<tr class="govuk-table__row">
					<th class="govuk-table__cell govuk-!-font-weight-regular govuk-!-width-one-half" scope="row">Chip opened</th>
					<td class="govuk-table__cell govuk-!-width-one-half"><strong class="govuk-tag govuk-tag--neutral app-task-list__task-completed">Ready</strong></td>
				</tr>
				<tr class="govuk-table__row">
					<th class="govuk-table__cell govuk-!-font-weight-regular" scope="row">MRZ read</th>
					<td class="govuk-table__cell"><strong class="govuk-tag govuk-tag--passed app-task-list__task-completed govuk-!-font-size-16">Ready</strong></td>
				</tr>
			</tbody>
		</table>
  );
};

export default ReadTable;
