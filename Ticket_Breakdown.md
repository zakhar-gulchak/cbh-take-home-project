# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Update the database schema to store custom IDs for Agents:
- **Acceptance Criteria**
  - Add a new column to the `Agents` table to store custom IDs.
  - Update the API to allow Facilities to set custom IDs for Agents.
  - The API should reject IDs that are already in use by other Agents belonging to the same Facility.
- **Time Estimate**
  - 3-5 hours
- **Implementation Details**
  - Update the database schema to add a new column to the Agents table to store the custom IDs.
  - Add migration logic to update the database schema.
  - Add an API endpoint that allows Facilities to set custom IDs for Agents.
  - Implement validation logic to ensure that custom IDs are unique for each Facility.

### Ticket 2: Update the getShiftsByFacility function to use custom IDs when generating reports:
- **Acceptance Criteria**
  - Update the `getShiftsByFacility` function to return custom IDs instead of internal database IDs.
  - Ensure that the custom IDs are used consistently throughout the report.
- **Time Estimate**
  - 2-3 hours
- **Implementation Details**
  - Modify the `getShiftsByFacility` function to include the custom ID of each Agent in the Shift metadata.
  - Update the report generation function to use the custom ID instead of the internal database ID when generating the report.

### Ticket 3: Update the generateReport function to handle custom IDs:
- **Acceptance Criteria**
  - Update the `generateReport` function to include the custom ID of each Agent in the report.
  - Ensure that the custom IDs are used consistently throughout the report.
- **Time Estimate**
  - 2-3 hours
- **Implementation Details**
  - Modify the `generateReport` function to include the custom ID of each Agent in the report.
  - Update the report generation logic to use the custom ID instead of the internal database ID when generating the report.
  - Ensure that the custom ID is displayed consistently throughout the report, including any tables or summaries that list the hours worked by each Agent.

Note: these estimates are rough approximations and can vary depending on the specific implementation details of the application.


