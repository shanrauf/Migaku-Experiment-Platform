# REST API Design

## General

Each folder represents a root endpoint/collection (described below) and contains the Express routes, a README denoting the endpoints of that root collection, and request/response data transfer objects via Typescript annotations that the backend and frontend both use (ensures that Typescript catches backend breaking changes on the frontend). In general, API routes follow the structure of `/collection/resource/collection`. The case of `/collection1/asdf/collection2` typically redirects to `/collection2?whateverId=asdf`. The Typescript annootations are in the form of classes (as oppoosed to interfaces or types) because only classes get compiled into Javascript and can be used at runtime to validate data. class-validator (validates class instance properties) and class-transformer (converts Javascript objects to a class instance) are used for data validation.

## Endpoints

### Auth

`/auth`

### Experiments

`/experiments`

### Participants

`/participants`

### Surveys

`/surveys`

### Questions

`/questions`

### Question Responses

`/questionresponses`

## Problems

Example queries I would want to run but don't know how to design query parameters for:

1. All experiments that haven't started yet, but they are going to start sometime between today (12-09-19) and a week from now (12-16-19)

startFrom, startUntil, endFrom, endUntil
