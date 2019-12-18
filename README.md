# Final Survey Documentation

## Setup
* Clone code or download as zip
* Download node: https://nodejs.org/en/download/

## Running the app
1. **npm install** in the root directory and in the backend directory to install all node modules from the package.json
    * cd to project root directory (cs320-f19-finalsurvey) after downloading -> npm install
    * cd backend -> npm install
2. **npm run dev** in the root directory. This command will run both the frontend and backend concurrently
3. Manager login: Austin_Cowan@bluesorbetsecurity.com<br />
password: cowanau<br /><br />
Employee 1 login: Marlee_Benson@bluesorbetsecurity.com<br />
password: besonma<br /><br />
Employee 2 login: Nevaeh_Koch@bluesorbetsecurity.com<br />
password: kochne

## Issues Not Solved
* Deleting a question in creating a survey will not reorder question numbers and cause issues unless deleting the last question in the list
* Employee submitting survey may not see their survey move to completed at first, must refresh the page to see it update
* Slider value is not default set, must move it at least once to set a value
