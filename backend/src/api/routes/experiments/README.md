# /experiments API

## `/experiments`

### GET (200)

Returns all experiments

Parameters:

```ts
requests.IExperimentFilters
```

Response:

```ts
responses.IExperiments
```

### POST (201)

Creates an experiment

Body:

```ts
{
    requests.IExperiment
}
```


## `/experiments/:experimentId`

### GET (200)

Gets an experiment

Response:

```ts
responses.IExperiment;
```

### DELETE (204)

Deletes an experiment

### PATCH (200) (Not implemented)

Updates an experiment

Body:

```ts
Partial<requests.IExperiment>
```

## `/experiments/:experimentId/participants`

### GET

Redirects to `/participants?experimentId=experimentId`

## `/experiments/:experimentId/participants/:participantId`

### PUT

Registers participant for experiment

Response:
```ts
requests.IExperimentParticipant
```

### DELETE

Drops participant for experiment

Response:
```ts
{}
```

## `/experiments/:experimentId/surveys`

### GET

Redirects to /surveys?experimentId=asdf

## `/experiments/:experimentId/questions`

### GET

Redirects to /questions?experimentId=asdf
