# /surveys API

## `/surveys`

### GET (200)

Get all surveys

Parameters:

```ts
requests.ISurveyFilters;
```

Response:

```ts
responses.ISurveys;
```

### POST (200)

Creates a survey

Body:

```ts
requests.ISurveyMetadata;
```

Response:

```ts
responses.ISurveyMetadata;
```

## `/surveys/:surveyId`

(surveyId="latest" finds latest surveyId, then proceeds w/ normal logic)

### (200) GET

Gets the metadata and questions/sections of survey.

Response:

```ts
responses.ISurveyMetadata;
```

### DELETE

Deletes a survey completely

### PATCH (NOT IMPLEMENTED)

Edit survey metadata, questions, etc

Response:

```ts
Partial<responses.ISurveyMetadata>
```

## `/surveys/:surveyId/status` (Will modify responses after Anki stuff)

### GET (200)

Returns survey completion status

- Status 0: E-mail/participant doesn't exist
- Status 1: Survey completed
- Status 2: Survey not completed
- Status 3: Survey completed and Anki data already synced

Parameters:

```ts
requests.ISurveyStatus;
```

Response:

```ts
responses.ISurveyStatus;
```

## `/surveys/:surveyId/questions`

### GET

Redirects to /questions?experimentId=asdf&surveyId=asdf

## `/surveys/:surveyId/responses`

### GET

Gets question responses to a survey's questions. (This should just redirect to /questionresponses?surveyId=asdf...)

Parameters:

```ts
requests.ISurveyResponses;
```

### POST

Submits a survey or Anki data

Body:

```ts
requests.ISurveyResponse;
```

## Todo:

- Ability to edit survey metadata (questions, description/title, etc)
