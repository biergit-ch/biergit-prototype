# Biergit Prototype

The purpose of this repo is to run tests and analyze their behavior. Also to get known to a different set of technologies

---

## Technologies used currently

> - MongoDB
> - Node JS / Express
> - React App

## Technologies to test

- [ ] Meteor
- [ ] Firebase

## Run App

1. install node modules

   - root
   - client
   - server

2. create local `.env` file in the client dir and copy over the `.env.example` vars or manually set them

   - set **REACT_APP_API_URI** to `http://localhost:3001/api`
   - set **REACT_APP_AUTH0_DOMAIN** to `https://tenant.region.auth0.com`
   - set **REACT_APP_AUTH0_CLIENT_ID** to `Auth0ClientId`
   - set **REACT_APP_AUTH0_CALLBACK_URI** to `http://localhost:3001/callback`

3. run `npm / yarn start` in root directory

### Deploy API to Heroku

Deploy to Heroku using `git subtree push --prefix server heroku master` from root dir

Set HEROKU env vars:

- **MONGO_USER**=user
- **MONGO_PASSWORD**=p@\$\$word
- **MONGO_PATH**=@provider:port/db

### Github Pages

- [Visit Docs](https://lucahost.github.io/biergit-prototype/)

## TODO

- [Client](https://github.com/lucahost/biergit-prototype/projects/1)
  - Authentication
  - Mongoose Schemas
- [API Specification](https://github.com/lucahost/biergit-prototype/projects/3)
- [Alternative Backend (Java Spring)](https://github.com/lucahost/biergit-prototype/projects/2)
