## AUTH-API-USING-NODEJS-TESTED-USING-CYPRESS

### To run the app:
+ `npm install`
+ Create .env file and add mongoDB URI as DB_CONNECT and jwt random token secret as TOKEN_SECRET.
+ `npm start`

### To run the tests:
`npm test`

### To make tests automated on code changes
+ Run this command in the terminal `npx cypress open --config watchForFileChanges=true`

### Tech-Stack
+ NodeJS & ExpressJS (for development)
+ Cypress (for continuous API testing)
+ MongoDB (for data storage)

### Libraries Used
+ mongoose (for mongodb connection)
+ bcryptjs (for password hashing)
+ hapi/Joi (for input data validation)
+ dotenv (for env variable configuration)
+ jsonwebtoken (for generating JWT)
+ guid (for generating random 128-bit text string)