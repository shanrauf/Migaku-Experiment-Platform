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

### `/experiments` POST (201)

(or `/experiments/:experimentId`) # note validate both experimentId values equal
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
    Experiment?: (any attribute)
}
```

### `/experiments/:experimentId/participants` GET (200)

Gets participants registered for experiment

Ressponse:

```
{
    Participant[]
}
```

### `/experiments/:experimentId/participants` POST (201)

Registers participant for experiment

Response:

```
{
    Participant
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

Gets surveys administered by experiment

Parameters:

```
{}
```

Response:

```
{
    Survey[]
}
```

### `/experiments/:experimentId/surveys` POST (201)

Schedules survey to be administered in the experiment (on frontend, if user selects existing surveyId, post here; otherwise, post to /surveys and then here)

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
    Survey[]
}
```

## Participants

### `/participants` GET (200)

Gets all participants

Response:

```

{
Participant[]
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
Participant
}

```

### `/participants/:participantId` GET (200)

Gets all participants

Response:

```

{
Participant[]
}

```

### `/participants/:participantId` PATCH (200)

Update participant info

Parameters:

```
{
    Participant? (any attribute)
}
```

Response:

```
{
Participant
}

```

### `/participants/:participantId/experiments` GET (200)

Get experiments that participant is registered for

Parameters:

```
{}
```

Response:

```
{
Experiment[]
}

```

### `/participants/:participantId/surveys` GET (200)

Get surveyIds and completion counts of surveys that that participant has filled out before

Response (object[]):

```
{
    [{
        surveyId: string
        numOfTimesCompleted: int (for individual #, count surveys that hve a questionResponse from participant; maybe globally store # of completions too cuz why not)
    }
    ]
}
```

Response:

```
{
Participant
}

```

## Surveys

### `/surveys` GET (200)

Get all surveys

Parameters:

```
{
    experimentId?: string
}
```

Response:

```
{
Survey[]
}
```

### `/surveys` POST (200)

Create a survey

Body:

```
{
    surveyId?: string # If empty, a random id is generated
    title: string
    description?: string
}
```

Response:

```
{
Survey[]
}
```

## `surveys/:surveyId` (201) POST

(Note: This is normally equivalent to /surveys POST, buuut for now it's not...)
Submits the survey response of a participant # NOTE maybe the better idea is to do /surveys/:surveyId/responses (create a responses "resource"; would make sense for analysis platform too, cuz we query responses);

Body:

```
{
    participantId: string
    Question[] # probably just key-value pairs, maybe value type (string, int) as well...
}
```
