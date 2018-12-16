# cni-news-fetcher
## Prerequisites
For running the project, you need the following to be installed on your machine

* Node
* npm

## Install
Clone/download the project. Enter the project root directory and install required dependencies with
```
npm install
```

## Run
#### Fast track - running with production version of client side app
In the project root directory, run
```
npm start
```
The application will be available, by default at <br>
[http://localhost:4000/]()

#### Running with development version of client side app
From the root folder, enter the 'client' directory and install required client-side dependencies with
```
npm install
```
Back in app root directory, run 
```
npm run dev
```
It will start server and client side apps in parallel. By default the client side app will be accessible at <br>
[http://localhost:3000/]()

## Tests
#### Running server side tests
In the project root directory, run
```
npm test
```
#### Running client side tests
From the root folder, enter the 'client' directory. From here run
```
npm test
```
