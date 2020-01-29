# /surveys API

## `/surveys`

### GET (200)

Get all surveys

Parameters:

```ts
requests.ISurveyFilters
```

Response:

```ts
responses.ISurveys
```

### POST (200)

Creates a survey

Body:

```ts
requests.ISurveyMetadata
```

Response:

```ts
responses.ISurveyMetadata
```


## `/surveys/:surveyId`

### (200) GET

Gets the metadata and questions/sections of survey. (If surveyId="latest", find latest survey, get it's surveyId, then proceed with normal logic)

Response:

```ts
responses.ISurveyMetadata
```

### DELETE

Deletes a survey completely

Response:
```
{}
```

### PATCH (NOT IMPLEMENTED) (Edit survey metadata, questions, etc)

## /surveys/:surveyId/status

### GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation). (If surveyId="latest", find latest survey, get it's surveyId, then proceed with normal logic)

Parameters:
```ts
requests.ISurveyStatus
```

Response:
```ts
responses.ISurveyStatus
```

## `/surveys/:surveyId/responses`

### GET

Gets question responses to a survey's questions. (This should just redirect to /questionresponses?surveyId=asdf...)

Parameters:
```ts
requests.ISurveyResponses
```

### POST

Submits a survey

Body:
```ts
requests.ISurveyResponse
```

### PATCH (if user can edit submission responses?)

## `/surveys/:surveyId/questions`

### GET (Gets questions for the survey)

Parameters:
```ts
requests.ISurveyQuestionFilters
```

Response:
```ts
responses.ISurveyQuestions
```

### POST

Associate questions with a survey by adding the question to an existing survey section

Body:
```ts
requests.ISurveyQuestionList
```

Response:
```ts
responses.ISurveyQuestionList
```
