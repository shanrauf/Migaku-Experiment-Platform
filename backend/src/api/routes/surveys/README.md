# /experiments/:experimentId/surveys API

## `/`

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

## `/:surveyId`

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

## `/:surveyId/status` (Will modify responses after Anki stuff)

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

## `/:surveyId/questions`

### GET

Redirects to /questions?experimentId=asdf&surveyId=asdf

## `/:surveyId/responses`

### GET

Redirects to /questionresponses?surveyId=asdf

### POST

Submits a survey or Anki data

Body:

```ts
requests.ISurveyResponse;
```

## Todo:

- Ability to edit survey metadata (questions, description/title, etc)
