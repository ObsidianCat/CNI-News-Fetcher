# cni-news-fetcher
## Prerequisites
For running the project, you need the following to be installed on your machine

Node, npm

## Installing
Clone/download the project
enter the project root directory and install required dependencies with
```
npm install
```

## Running with production version of client side app
In the project root directory, run
```
npm start
```
The application will be available, by default at 
###
http://localhost:4000/

### Running with development version of client side app
Withing the project folder, enter the 'client' directory and install required client-side dependencies with
```
npm install
```
Back in app root directory, run 
```
npm run dev
```
It will start server and client side apps in parallel. By default the client side app will be accessible at 
###
http://localhost:3000/

## Running the tests
### Running server side tests
In the project root directory, run
```
npm test
```
### Running client side tests
In the project client directory, run
```
npm test
```
