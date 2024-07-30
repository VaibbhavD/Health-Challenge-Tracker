Workout Tracker
Description
The Workout Tracker is a single-page application (SPA) built using Angular 17+, Angular Material, and Tailwind CSS. This application allows users to add, view, and filter workout data. It also features pagination, search, and chart visualization of workout data.

Features
Add Users and Workouts: Users can input their name, workout type, and duration.
Display Workouts: The workouts are displayed in a table with pagination for easy navigation.
Search and Filter: Users can search by username and filter by workout type.
Data Persistence: User data is stored in localStorage to persist across page reloads.
Chart Visualization: A chart visualizes the total workout minutes for each user.
Responsive Design: The application is responsive and works on different screen sizes.
Installation
Prerequisites
Node.js and npm (Node Package Manager)
Angular CLI
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/workout-tracker.git
cd workout-tracker
Install the dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
ng serve
The application will be accessible at http://localhost:4200/.

Usage
Add User and Workout: Use the form to add new users and their workout details.
Search: Use the search bar to find users by name.
Filter: Use the dropdown to filter workouts by type.
View Charts: Check the chart section to see the total workout minutes for each user.
Technologies Used
Angular 17+: Framework for building the SPA.
Angular Material: UI components for Angular.
Tailwind CSS: Utility-first CSS framework for styling.
Chart.js: Library for charting and visualization.
Testing
Unit Tests
The application includes unit tests for one component and one service. To run the tests and generate a coverage report:

Run the tests:

bash
Copy code
ng test --code-coverage
View the coverage report:

The coverage report can be found in the coverage directory. Open the index.html file in a browser to view the detailed report.

Deployment
deploy on Netlify- :

Build the application:

bash
Copy code
ng build --prod
Deploy the dist folder to Netlify.

Follow the instructions on the Netlify dashboard to deploy the site.
