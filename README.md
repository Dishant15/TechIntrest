# TechIntrest
A social platform to share all the amazing tech images. Created as a solution to [FreeCodeCamp](https://www.freecodecamp.com/) project [Build a Pinterest Clone](https://www.freecodecamp.com/challenges/build-a-pinterest-clone).

### Challenges Faced and solved
#### BackEnd
+ Node, Express, MongoDb
+ RestFull API as FrontEnd is going to be full React
+ HandleBars as templating engine to pass minimal parameters between pages and Rendering initial HTML page
+ Twitter login, with passport.js

#### FrontEnd
+ React, Sass, ECMAScript2015(es6), Webpack
+ Compiling javascript es6 code with bable/Webpack for maximum browser support
+ Compiling React with react-hot loading enabled with Webpack dev server. This provides live reload with react code and decreases development time a lot!(check out webpack_server.js file for more info)
+ Compiling Sass to css with Webpack (using ruby sass gem to compile previously), Using webpack makes a single compile point for all javascript and css and single watcher instance of webpack is required to run while developing.
+ Redux as a frontend data store with React for seamless user experience and also makes React code more structured with its central single store and multiple reducers working on it


Checkout Live project on [Heroku](https://techintrest15.herokuapp.com/)
