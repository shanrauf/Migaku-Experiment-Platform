# REST API Design

(NOTE: I think Discord does that "duplication" e.x /experiments/abcd/participants is cleaner than /participants?experimentId=abcd, but u can let both work)

## Auth

### `/auth/discord` GET (200 || 401)

Goes through OAuth 2.0 flow for Discord and attaches Participant cookie for future requests or returns 401 error

## Experiments

### `/experiments` GET (200)

Returns all experiments

Parameters:

```ts
{
    surveyId?: String // returns all experiments that administered this survey
    participantId?: String // Returns experiments that participant is registered for
}
```

Response:

```ts
{
    experiments: Experiment[]
}
```

### `/experiments` POST (201)

(shorthand for `/experiments/:experimentId` POST) # validate url and body experimentId values equal  
Creates an experiment

Body:

```ts
{
    experimentId?: String, // If left empty, a random id is generated
    title: String,
    description?: String,
    startDate: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: String, // ("public" | "private")
    questions: questionId[] // array of questionId strings to add to ExperimentQuestion table
}
```

### `/experiments` DELETE (204)

(shorthand for `/experiments/:experimentId`)
Deletes an experiment

Body:

```ts
{
  "experimentId": String
}
```

### `/experiments/:experimentId` GET (200)

Gets an experiment

Response:

```ts
{
    experimentId: String,
    title: String,
    description: String | null,
    startDate: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    endDate: String | null, // (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: String // ("public" | "private")
}
```

### `/experiments/:experimentId` PATCH (200)

Updates an experiment

Body:

```ts
{
    ...Experiment? // (any attribute)
}
```

### `/experiments/:experimentId/participants` GET (200)

Redirects to `/participants?experimentId=experimentId`

### `/experiments/:experimentId/participants` POST (201)

(shorthand for `/experiments/:experimentId:/participants/:participantId`)
Registers participant for experiment

Body:

```ts
{
  participantId: string;
}
```

Response:

```ts
{
  ...Participant
}
```

### `/experiments/:experimentId/participants` DELETE (204)

(shorthand for `/experiments/:experimentId/participants/:participantId`)  
Unregisters participant for experiment

Body:

```ts
{
  "participantId": string
}
```

Response:

```ts
{
}
```

#### `/experiments/:experimentId/surveys` GET (200)

Get all surveys

Parameters:

```ts
{
    participantId?: String // returns surveys that the participant has completed
    surveyId?: String // Returns metadata of specific survey
    visibility?: String // default = "public"; ("public", "private?) (NOTE: participants shouldn't be authenticated to request "private" surveys)
}
```

Response:

```ts
{
    surveys: Survey[] // (metadata e.x title/description/requirements) (if surveyId parameter, this array length is just 1)
}
```

### `/experiments/:experimentId/surveys` POST (200)

Creates a survey

Body:

```ts
{
    surveyId?: String, // If empty, a random id is generated
    title: String,
    description?: String,
    startDate: String, // (ISO string)
    endDate?: String, // (ISO string)
    surveyCategory: String, // (any string of your choice; e.x "regular", "initial", "mid-experiment")
    visibility: String, // ("public" | "private")
    sections: SurveySection[]
}
```

Response:

```ts
{
    surveys: Survey[]
}
```

### `/experiments/:experimentId/surveys/latest` GET (200)

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (GET)

## `/experiments/:experimentId/surveys/:surveyId` (200) GET

Gets the metadata and questions/sections of survey

Parameters:

```ts
{
    sections?: sectionId[] // only return these sections/questions (good for pagination for example)
}
```

Response:

```ts
{
  ...Survey // (questions / sections, metadata, etc)
}
```

## `/experiments/:experimentId/surveys/latest` (201) POST

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (POST)

## `/experiments/:experimentId/surveys/:surveyId` (201) POST

(Note this route can be posted to many times with new question key/value pairs; we submit survey here, then submit anki data here; if we don't want this, then validate that payload has every question from survey)
Submits the survey response of a participant

Body:

```ts
{
    email: String, // (temporary due to Anki addon implementation)
    experimentId: String,
    ...questionKeyValuePairs // (temporary due to Anki implementation)
}
```

<!-- Ideally:
{
participantId: string;
experimentId: string
questions: Question[] # array of objects with key, value, type (String, int)
} -->

### `/experiments/:experimentId/surveys/latest/status?email=email` GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation)

## `/experiments/:experimentId/surveys/latest` (POST)

Finds latest survey, then POSTs to `/surveys:surveyId` with experimentId in body (legacy route to support Anki addon implementation)

## Participants

### `/participants` GET (200)

Gets all participants

Parameters:

```ts
{
    experimentId?: String, // returns participants registered for this experiment
    surveyId?: String, // returns participants who completed this survey
    requirements?: String // comma-delimited string (e.x "completedPRTK=false,knownWordCount=559")
}
```

Response:

```ts

{
    participants: Participant[]
}

```

### `/participants` POST (201)

(or `/participants/:participantId`)
Creates a participant (e.x user sign-up)

Body:

```ts

{
    experimentId?: String, // # Gets all participants who signed up for this experiment
    surveyId?: String, // Get all participants who filled out this survey
    description?: String,
    startDate?: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    visibility?: String // ("public" | "private")
}

```

Response:

```ts
{
  ...Participant
}
```

### `/participants/:participantId` GET (200)

Gets a participant

Response:

```ts
{
  ...Participant
}
```

### `/participants/:participantId` PATCH (200)

Update participant info

Parameters:

```ts
{
    ...Participant? // (any attribute)
}
```

Response:

```ts
{
  ...Participant
}
```

## Problems

I am trying to figure out the how to design filtering parameters for a GET request to /experiments

Example queries I would want to run but don't know how to design query parameters for:

1. All experiments that haven't started yet, but they are going to start sometime between today (12-09-19) and a week from now (12-16-19)

2. All experiments that haven't

startFrom, startUntil, endFrom, endUntil
