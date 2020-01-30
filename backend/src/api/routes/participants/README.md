# /participants API

## `/participants`

### GET (200)

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

### POST (201)

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

## `/participants/:participantId`

### GET (200)

Gets a participant

Response:

```ts
{
  ...Participant
}
```

### PATCH (200)

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

## DELETE (204)

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

## `/participants/:participantId/experiments`

### GET

Redirects to /experiments?participantId=asdf