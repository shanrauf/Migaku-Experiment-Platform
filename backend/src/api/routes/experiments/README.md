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

```ts
responses.IDeleteExperiment
```

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
responses.IExperimentParticipant
```

### DELETE

Drops participant for experiment

## `/experiments/:experimentId/surveys`

### GET

Redirects to /surveys?experimentId=asdf

## `/experiments/:experimentId/questions`

### GET

Redirects to /questions?experimentId=asdf

## TODO:
- Route to update ExperimentQuestions (which is essentially the experiment data schema, and is used to validate request bodies when creating experiments and accepting question responses; aka VERY IMPORTANT)