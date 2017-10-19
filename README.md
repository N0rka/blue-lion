blue-lion
=========================

Simple word cloud project for demonstration purpose.



## Installation
This assumes that you’re using [node](https://nodejs.org/en/) and [npm](http://npmjs.com/).
1. Clone the project.
2. At the root of the project `npm install`.


## Development
```
npm start
```
An express server is launched. Open http://localhost:3000/ in your browser.

#### Project structure
* `app/actions:` functions dispatching type and data to reducers
* `app/components:` react components
* `app/reducers` redux reducers
* `app/stylesheets:` scss files
* `app/tests` jest tests
* `app/utils:` common calculation functions


## Test
```
npm test
```
Jest is used to performed tests on actions, components, and reducers.


## Build
```
npm run build
```
Webpack is used to build and bundle the code. The output files are placed in `dist`.