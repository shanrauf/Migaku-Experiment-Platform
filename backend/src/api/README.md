# REST API Design

## Experiments

### `/experiments` GET (200)

Returns all experiments

Parameters:

```
{
    surveyId?: string # returns all experiments that administered this survey
    participantId?: string # Returns experiments that participant is registered for
}
```

Response:

```
{
    experiments: Experiment[]
}
```

### `/experiments` POST (201)

(shorthand for `/experiments/:experimentId` POST) # validate url and body experimentId values equal  
Creates an experiment

Body:

```
{
    experimentId?: string # If left empty, a random id is generated
    title: string
    description?: string
    startDate: string (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: string (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: string ("public" | "private")
}
```

### `/experiments` DELETE (204)

Deletes an experiment

Parameters:

```
{
    experimentId: string
}
```

### `/experiments/:experimentId` GET (200)

Gets an experiment

Response:

```
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

```
{
    ...Experiment?: (any attribute)
}
```

### `/experiments/:experimentId/participants` POST (201)

(or `/experiments/:experimentId:/participants/:participantId`)
Registers participant for experiment

Response:

```
{
    ...Participant
}
```

### `/experiments/:experimentId/participants` DELETE (204)

(or `/experiments/:experimentId/participants/:participantId`)  
Unregisters participant for experiment

Parameters:

```
{
    participantId: string
}
```

Response:

```
{}
```

### `/experiments/:experimentId/surveys` GET (200)

Redirect to /surveys/:surveyId?experimentId=experimentId

### `/experiments/:experimentId/surveys/latest` GET (200)

Redirect to /surveys/latest?experimentId=experimentId

### `/experiments/:experimentId/surveys/latest/status?email=email` GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation)

### `/experiments/:experimentId/surveys` POST (201)

Schedules survey to be administered in the experiment (on frontend, if user selects existing surveyId, post here; otherwise, post to /surveys and then here)  
(Note I feel like this isn't an ideal route, but it'll do for now)

Body:

```
{
    surveyId: string
    startDate: string (ISO string)
    endDate?: string (ISO string)
    surveyCategory: string (any string of your choice)
    visibility: string ("public" | "private")
}
```

Response:

```
{
    surveys: Survey[]
}
```

## `/experiments/:experimentId/surveys/:surveyId` (POST)

Redirects to `/surveys:surveyId` with experimentId in body (legacy route to support Anki addon implementation)

## Participants

### `/participants` GET (200)

Gets all participants

Parameters:

```
{
    experimentId?: returns participants registered for this experiment
    surveyId?: returns participants who completed this survey
    requirements?: comma-delimited string (e.x "completedPRTK=false,knownWordCount=559")
}
```

Response:

```

{
    participants: Participant[]
}

```

### `/participants` POST (201)

(or `/participants/:participantId`)
Creates a participant (e.x user sign-up)

Body:

```

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

```

{
    ...Participant
}

```

### `/participants/:participantId` GET (200)

Gets a participant

Response:

```

{
    ...Participant
}

```

### `/participants/:participantId` PATCH (200)

Update participant info

Parameters:

```
{
    ...Participant? (any attribute)
}
```

Response:

```
{
    ...Participant
}

```

## Surveys

### `/surveys` GET (200)

Get all surveys

Parameters:

```
{
    experimentId?: string # returns surveys that the experiment has administered
    participantId?: string # returns surveys that the participant has completed
    surveyId?: string # Returns metadata of just this survey
}
```

Response:

```
{
    surveys: Survey[] # (metadata e.x title/description/requirements) (if surveyId parameter, this array length is just 1)
}
```

### `/surveys` POST (200)

Creates a survey

Body:

```
{
    surveyId?: string # If empty, a random id is generated
    title: string
    description?: string
    sections: SurveySection[]
}
```

Response:

```
{
    surveys: Survey[]
}
```

## `/surveys/:surveyId` (200) GET

Gets the metadata and questions/sections of survey

Parameters:

```
{
    sections: sectionId[] // only return these sections/questions (good for pagination for example)
}
```

Response:

```
{
    ...Survey (questions/sections, metadata, etc)
}
```

## `/surveys/:surveyId` (201) POST

(or `/surveys/latest` POST which is self-explanatory)
(Note this route can be posted to many times with new question key/value pairs; we submit survey here, then submit anki data here)
Submits the survey response of a participant

Body:

```
{
    <!-- participantId: string; -->
    email: string (temporary due to Anki addon implementation)
    experimentId: string
    ...questionKeyValuePairs
    <!-- questions: Question[] # array of objects with key, value, type (string, int) -->
}
```
