# /experiments API

## `/experiments`

### GET (200)

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
    experiments: responses.IExperiment[]
}
```

### POST (201)

Creates an experiment

Body:

```ts
{
    experimentId!: String, // If left empty, a random id is generated
    title: String,
    description?: String,
    startDate: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    endDate?: String, // (ISO string: "2019-12-14T13:19:44.000Z")
    visibility: String, // ("public" | "private")
    questions: questionId[] // array of questionId strings to add to ExperimentQuestion table
}
```

### DELETE (204)

Deletes an experiment

Body:

```ts
{
  "experimentId": String
}
```

## `/experiments/:experimentId`

### GET (200)

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

### PATCH (200)

Updates an experiment

Body:

```ts
{
    ...Experiment? // (any attribute)
}
```

## `/experiments/:experimentId/participants`

Redirects to `/participants?experimentId=experimentId`

## `/experiments/:experimentId/participants` POST (201)

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

## `/experiments/:experimentId/participants` DELETE (204)

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

## TODO

- Implement query parameters in code for /experiments
