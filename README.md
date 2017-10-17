# Place Plotter
Place Plotter is a web application built with React on the front end and a node/express server on the backend

Testing is done with Mocha / Chai / Sinon / Enzyme

## Setup / Start
To use this app, you'll need to take the following steps:

* This app runs with a node server so please have that installed
* Then run `npm install`
* `npm start` will build your bundle, spin up the server and start the app on port 1337
* `npm run test` will run all the tests

### About
* This web application uses Google Text Search (this method allows for better search query relevance matches) to search for a desired place
* Upon load, the web application will ask whether or not to allow geolocation and if it is not allowed, the starting location will default to Zenefit's Headquarters in San Francisco :-)
* Users can set their desired search radius and place availability from the options
* Markers relevant to the type of establishment are loaded onto the map for each returned place and a list is generated below the search input
* The list contains (if available) a picture, name, ratings, price level, and whether the establishment is currently open or not (at the time of query)
* If a user clicks on a place on the places list, an `infowindow` will open on that establishment's marker with the store name and address
* Also the title's colors are randomly generated

#### Challenges
* Using Google Maps API in React was initially challenging since React uses a virtual DOM while Google seems to inject itself directly into the HTML file
* Most of the Google examples used jquery or vanilla javascript listeners to interact with the map but this was a great opportunity to use React's "ref"
* I wanted to keep all the state in one "main" place so that it was easy to maintain but it ended up causing reference issues so I had to export the map canvas object in order to allow it to be used in other components

##### Next Steps
* I would like to implement google directions API and allow users to input a starting point
* It would be really neat to use the `place details` api to get more information on each returned place
* Add more tests and learn how to introduce the google object to the virtual DOM for testing (currently the `google` object is not available in the `jsdom-global`)
* Be more organized with my .scss file and split it up into more component-specific files
* Build a more colorful design!

###### Feedback
Overall, I really liked this assignment and I had a lot of fun with it!
