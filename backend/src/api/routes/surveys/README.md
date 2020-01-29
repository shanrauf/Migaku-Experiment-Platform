# /surveys API

### `/surveys`

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

## `/surveys/latest`

### GET (200)

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (GET)

Response:
```ts
responses.ISurveyMetadata
```


## `/surveys/:surveyId`

### (200) GET

Gets the metadata and questions/sections of survey

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

## /surveys/:surveyId/status?email=email

### GET (200)

## `/surveys/latest/status?email=email`

### GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation)

Parameters:
```ts
requests.ISurveyStatus
```

Response:
```ts
responses.ISurveyStatus
```

## `/surveys/:surveyId/responses` (NOT IMPLEMENTED)

### GET

Gets question responses to a survey's questions. (This should just redirect to /questionresponses?surveyId=asdf...)

### POST (survey submission?)

### PATCH (if user can edit submission responses?)

## `/surveys/:surveyId/questions` (NOT IMPLEMENTED)

### GET (Gets questions for the survey)

Parameters:
```ts
{
    sectionNumber: Number;
}
```

### POST (associate question with a survey by adding the question to an existing survey section)


## TODO
- Implement query parameters in code for /surveys