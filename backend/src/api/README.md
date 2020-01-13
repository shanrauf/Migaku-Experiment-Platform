# REST API Design

(NOTE: I think Discord does that "duplication" e.x /experiments/abcd/participants is cleaner than /participants?experimentId=abcd, but u can let both work)

## Auth

### `/auth/discord` GET (200 || 401)

Goes through OAuth 2.0 flow for Discord and returns participant or 401 error

## Experiments

### `/experiments` GET (200)

Returns all experiments

Parameters:

```json
{
    surveyId?: string # returns all experiments that administered this survey
    participantId?: string # Returns experiments that participant is registered for
}
```

Response:

```json
{
    experiments: Experiment[]
}
```

### `/experiments` POST (201)

(shorthand for `/experiments/:experimentId` POST) # validate url and body experimentId values equal  
Creates an experiment

Body:

```json
{
    experimentId?: string # If left empty, a random id is generated
    title: string
    description?: string
    startDate: string (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: string (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: string ("public" | "private")
    questions: questionId[] # array of questionId strings to add to ExperimentQuestion table
}
```

### `/experiments` DELETE (204)

(shorthand for `/experiments/:experimentId`)
Deletes an experiment

Body:

```json
{
  "experimentId": string
}
```

### `/experiments/:experimentId` GET (200)

Gets an experiment

Response:

```json
{
    experimentId: string
    title: string
    description: string | null
    startDate: string (ISO string: "2019-12-14T13:19:44.000Z")
    endDate: string | null (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: string ("public" | "private")
}
```

### `/experiments/:experimentId` PATCH (200)

Updates an experiment

Body:

```json
{
    ...Experiment?: (any attribute)
}
```

### `/experiments/:experimentId/participants` GET (200)

Redirects to `/participants?experimentId=experimentId`

### `/experiments/:experimentId/participants` POST (201)

(shorthand for `/experiments/:experimentId:/participants/:participantId`)
Registers participant for experiment

Body:

```json
{
    participantId: string;
}
```

Response:

```json
{
  ...Participant
}
```

### `/experiments/:experimentId/participants` DELETE (204)

(shorthand for `/experiments/:experimentId/participants/:participantId`)  
Unregisters participant for experiment

Body:

```json
{
  "participantId": string
}
```

Response:

```json
{}
```

#### `/experiments/:experimentId/surveys` GET (200)

Get all surveys

Parameters:

```json
{
    participantId?: string # returns surveys that the participant has completed
    surveyId?: string # Returns metadata of specific survey
    visibility?: string # default "public"; ("public", "private?) (NOTE: avg participants shouldn't be authenticated to request "private" surveys)
}
```

Response:

```json
{
    surveys: Survey[] # (metadata e.x title/description/requirements) (if surveyId parameter, this array length is just 1)
}
```

### `/experiments/:experimentId/surveys` POST (200)

Creates a survey

Body:

```json
{
    surveyId?: string # If empty, a random id is generated
    title: string
    description?: string
    startDate: string (ISO string)
    endDate?: string (ISO string)
    surveyCategory: string (any string of your choice; e.x "regular", "initial", "mid-experiment")
    visibility: string ("public" | "private")
    sections: SurveySection[] # contains Question[]
}
```

Response:

```json
{
    surveys: Survey[]
}
```

### `/experiments/:experimentId/surveys/latest` GET (200)

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (GET)

## `/experiments/:experimentId/surveys/:surveyId` (200) GET

Gets the metadata and questions/sections of survey

Parameters:

```json
{
    sections?: sectionId[] // only return these sections/questions (good for pagination for example)
}
```

Response:

```json
{
  ...Survey(questions / sections, metadata, etc)
}
```

## `/experiments/:experimentId/surveys/latest` (201) POST

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (POST)

## `/experiments/:experimentId/surveys/:surveyId` (201) POST

(Note this route can be posted to many times with new question key/value pairs; we submit survey here, then submit anki data here; if we don't want this, then validate that payload has every question from survey)
Submits the survey response of a participant

Body:

```json
{
    email: string (temporary due to Anki addon implementation)
    experimentId: string
    ...questionKeyValuePairs (temporary due to Anki implementation)
}
```

<!-- Ideally:
{
participantId: string;
experimentId: string
questions: Question[] # array of objects with key, value, type (string, int)
} -->

### `/experiments/:experimentId/surveys/latest/status?email=email` GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation)

## `/experiments/:experimentId/surveys/latest` (POST)

Finds latest survey, then POSTs to `/surveys:surveyId` with experimentId in body (legacy route to support Anki addon implementation)

## Participants

### `/participants` GET (200)

Gets all participants

Parameters:

```json
{
    experimentId?: returns participants registered for this experiment
    surveyId?: returns participants who completed this survey
    requirements?: comma-delimited string (e.x "completedPRTK=false,knownWordCount=559")
}
```

Response:

```json

{
    participants: Participant[]
}

```

### `/participants` POST (201)

(or `/participants/:participantId`)
Creates a participant (e.x user sign-up)

Body:

```json

{
    experimentId?: string # Gets all participants who signed up for this experiment
    surveyId?: string # Get all participants who filled out this survey
    description?: string
    startDate?: string (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: string (ISO string: "2019-12-14T13:19:44.000Z")
    visibility?: string ("public" | "private")
}

```

Response:

```json
{
  ...Participant
}
```

### `/participants/:participantId` GET (200)

Gets a participant

Response:

```json
{
  ...Participant
}
```

### `/participants/:participantId` PATCH (200)

Update participant info

Parameters:

```json
{
    ...Participant? (any attribute)
}
```

Response:

```json
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
