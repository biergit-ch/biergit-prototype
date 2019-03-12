# Biergit Prototype

The purpose of this repo is to run tests and analyze their behavior. Also to get known to a different set of technologies
___

### Technologies used currently

- MongoDB
- Node JS / Express
- React App

## Run App

1. install node modules
    - root
    - client
    - server
2. create local `.env` file in the client dir
    - set **REACT_APP_HEROKU_API_URL** to `http://localhost:3000`
3. run `npm / yarn start` in root directory

### Deploy API to Heroku

Deploy to Heroku using `git subtree push --prefix server heroku master` from root dir
