# BillPay

A bill payment application which leverages AWS Lambda and Serverless framework to enable customers purchase airtime on Nigerian mobile networks. This was built to fulfill the requirements for the Capstone project of the Udacity Cloud Developer Nanodegree programme.

## Functionality of the application

The application allows users to create a profile, update their wallets, make payments from their wallets and view their transactions. Each user only has access to the transactions which have been carried out on their profile.

## Prerequisites

### Node.js and NPM

Before getting started, make sure Node.js is downloaded and installed. The latest version of Node.js can be downloaded from [nodejs.org](https://nodejs.com/en/download) and it's recommended to use the LTS version.

### Serverless Framework

Serverless Framework is used to build and deploy the application. Instructions for installing Serverless Framework can be found [here](https://serverless.com/framework/docs/getting-started/).

### Amazon Web Services (AWS)

An AWS account is required to deploy the application.

### Auth0

Auth0 is used for authentication and an Auth0 application should be created with asymmetrically encrypted keys (RS256).

## Getting started

### Backend

To build and deploy the application, first edit the `backend/serverless.yml` file to set the appropriate AWS and Auth0 parameters, then run the following commands:

1. cd to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Build and deploy to AWS: `sls deploy -v`

### Frontend

To run the client application, first edit the `client/src/config.ts` file to set the appropriate AWS and Auth0 parameters, then run the following commands:

1. cd to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Run the client application: `npm run start`

This should start a development server with the React application that will interact with the serverless BillPay application.

### Postman collection

A Postman collection is available in the root folder of the project, as an alternative way to test the API.

### Test Data

In order to carry out a successful transaction, any 11 digit number can be used when prompted to enter the phone number. An example could be 08166127025

### Considerations

Although the delete profile endpoint has been created in the source code to demonstrate the ability to delete records from the DB, it is not consumed on the frontend as it is not required based on the use case.


## Acknowledgements

This project was bootstrapped with [https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code](https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code).
